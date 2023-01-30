import Comment from '../models/Comment.js'
import ReportedComment from '../models/ReportedComments.js'

export const addComment = async (req, res, next) => {
  const userId = req.userId
  const { videoId } = req.params
  const { comment } = req.body
  const newComment = new Comment({ userId, videoId, desc: comment })

  try {
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (err) {
    next(err)
  }
}

export const getComments = async (req, res, next) => {
  const { videoId } = req.params
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Comment.find({ videoId }).countDocuments({})

    const comments = await Comment.aggregate([
      { $match: { videoId: videoId } },
      {
        $project: {
          __v: 0,
        },
      },
      { $addFields: { userObjectId: { $toObjectId: '$userId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userObjectId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $project: {
          'userInfo.createdAt': 0,
          'userInfo.email': 0,
          'userInfo.likedVideos': 0,
          'userInfo.subscribedUsers': 0,
          'userInfo.updatedAt': 0,
          'userInfo.watchedVideos': 0,
          'userInfo.__v': 0,
          'userInfo.subscribers': 0,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: startIndex },
      { $limit: 20 },
    ])

    res
      .status(200)
      .json({ data: comments, numberOfPages: Math.ceil(total / 20), total })
  } catch (err) {
    next(err)
  }
}

export const getReportedComments = async (req, res, next) => {
  try {
    const reportedComments = await ReportedComment.aggregate([
      { $addFields: { userObjectId: { $toObjectId: '$userId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userObjectId',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                name: 1,
                picture: 1,
                numberOfSubcribers: {
                  $cond: {
                    if: { $isArray: '$subscribers' },
                    then: { $size: '$subscribers' },
                    else: '0',
                  },
                },
              },
            },
          ],
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $project: { userObjectId: 0, userId: 0 },
      },
      { $addFields: { reportUserObjectId: { $toObjectId: '$reportUserId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'reportUserObjectId',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                name: 1,
                picture: 1,
                numberOfSubcribers: {
                  $cond: {
                    if: { $isArray: '$subscribers' },
                    then: { $size: '$subscribers' },
                    else: '0',
                  },
                },
              },
            },
          ],
          as: 'reportUserInfo',
        },
      },
      {
        $unwind: '$reportUserInfo',
      },
      {
        $project: { reportUserObjectId: 0, reportUserId: 0 },
      },
      { $addFields: { videoObjectId: { $toObjectId: '$videoId' } } },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoObjectId',
          foreignField: '_id',
          as: 'videoInfo',
        },
      },
      {
        $unwind: '$videoInfo',
      },
      {
        $project: { videoObjectId: 0, videoId: 0 },
      },
      { $addFields: { commentObjectId: { $toObjectId: '$commentId' } } },
      {
        $lookup: {
          from: 'comments',
          localField: 'commentObjectId',
          foreignField: '_id',
          as: 'commentInfo',
        },
      },
      {
        $unwind: '$commentInfo',
      },
    ])
    res.status(200).json(reportedComments)
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params

  try {
    await Comment.findByIdAndDelete(commentId)
    res.status(200).json({ message: 'delete successfully' })
  } catch (err) {
    next(err)
  }
}

export const reportComment = async (req, res, next) => {
  const reportUserId = req.userId
  const { commentId } = req.params
  const reportContent = req.body.reportMessage
  const videoId = req.body.videoId
  const userId = req.body.userId
  const newReportedComment = new ReportedComment({
    userId,
    commentId,
    videoId,
    reportUserId,
    reportContent,
  })

  try {
    await newReportedComment.save()
    res.status(200).json({ message: 'Reported' })
  } catch (err) {
    next(err)
  }
}

export const getComment = async (req, res, next) => {
  const { commentId } = req.params

  try {
    const comment = await Comment.findById(commentId)

    res.status(200).json(comment)
  } catch (err) {
    next(err)
  }
}
