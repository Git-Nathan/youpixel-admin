import Video from '../models/Video.js'
import Comment from '../models/Comment.js'
import User from '../models/User.js'

export const addVideo = async (req, res, next) => {
  const userId = req.userId
  const video = new Video({ userId, ...req.body })

  try {
    video.save()
    res.status(200).json(video)
  } catch (err) {
    next(err)
  }
}

export const editVideo = async (req, res, next) => {
  const { videoId } = req.params
  const userId = req.userId

  try {
    const video = await Video.findById(videoId)
    if (userId === video.userId) {
      await Video.findByIdAndUpdate(videoId, { ...req.body })
      res.status(200).json({ message: 'edit successfully' })
    } else {
      return next(createError(403, 'You can only edit your video!'))
    }
  } catch (err) {
    next(err)
  }
}

export const fetchVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([
      { $match: { status: 'approved' } },
      { $sample: { size: 500 } },
      {
        $project: {
          status: 0,
          videoPath: 0,
          videoUrl: 0,
          likes: 0,
          __v: 0,
          dislikes: 0,
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
    ])

    res.status(200).json({ data: videos })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getVideo = async (req, res) => {
  const { id } = req.params

  try {
    const video = await Video.findById(id)

    res.status(200).json(video)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addView = async (req, res) => {
  const { id } = req.params

  try {
    await Video.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    })
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTopView = async (req, res) => {
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Video.find({ status: 'approved' }).countDocuments({})

    const videos = await Video.aggregate([
      { $match: { status: 'approved' } },
      {
        $project: {
          status: 0,
          videoPath: 0,
          videoUrl: 0,
          likes: 0,
          __v: 0,
          dislikes: 0,
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
      { $sort: { views: -1 } },
      { $skip: startIndex },
      { $limit: 20 },
    ])

    res
      .status(200)
      .json({ data: videos, numberOfPages: Math.ceil(total / 20), total })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserVideos = async (req, res) => {
  const { id } = req.query
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Video.find({
      userId: id,
      status: 'approved',
    }).countDocuments({})

    const videos = await Video.aggregate([
      { $match: { userId: id, status: 'approved' } },
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
      { $addFields: { videoStringId: { $toString: '$_id' } } },
      {
        $lookup: {
          from: 'comments',
          localField: 'videoStringId',
          foreignField: 'videoId',
          as: 'comments',
        },
      },
      {
        $addFields: {
          numOfComment: {
            $cond: {
              if: { $isArray: '$comments' },
              then: { $size: '$comments' },
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          comments: 0,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: startIndex },
      { $limit: 20 },
    ])

    res
      .status(200)
      .json({ data: videos, numberOfPages: Math.ceil(total / 20), total })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserVideosPending = async (req, res) => {
  const { id, page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Video.find({
      userId: id,
      status: ['draft', 'pending', 'denied'],
    }).countDocuments({})

    const videos = await Video.find({
      userId: id,
      status: ['draft', 'pending', 'denied'],
    })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(20)

    res
      .status(200)
      .json({ data: videos, numberOfPages: Math.ceil(total / 20), total })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserVideosToApproval = async (req, res) => {
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Video.find({
      status: 'pending',
    }).countDocuments({})

    const videos = await Video.find({
      status: 'pending',
    })
      .sort({ createdAt: 1 })
      .skip(startIndex)
      .limit(20)

    res
      .status(200)
      .json({ data: videos, numberOfPages: Math.ceil(total / 20), total })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const approveVideo = async (req, res) => {
  const { videoId } = req.params

  try {
    await Video.findByIdAndUpdate(videoId, {
      status: 'approved',
    })
    res.status(200).json({ message: 'Approved' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const denyVideo = async (req, res) => {
  const { videoId } = req.params

  try {
    await Video.findByIdAndUpdate(videoId, {
      status: 'denied',
    })
    res.status(200).json({ message: 'denied' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteVideo = async (req, res, next) => {
  const { videoId } = req.params
  const userId = req.userId
  const role = req.role

  try {
    const video = await Video.findById(videoId)
    if (role === 'admin' || userId === video.userId) {
      await Video.findByIdAndDelete(videoId)
      await Comment.deleteMany({
        videoId: videoId,
      })
      await User.updateMany(
        {},
        {
          $pull: {
            likedVideos: {
              videoId: videoId,
            },
            watchedVideos: {
              videoId: videoId,
            },
          },
        },
      )
      res.status(200).json({ message: 'delete successfully' })
    } else {
      return next(createError(403, 'You can only delete your video!'))
    }
  } catch (err) {
    next(err)
  }
}

export const getVideosBySearch = async (req, res, next) => {
  const { search_query, page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Video.find({
      title: { $regex: search_query, $options: 'i' },
      status: 'approved',
    }).countDocuments({})

    const result = await Video.aggregate([
      {
        $match: {
          title: { $regex: search_query, $options: 'i' },
          status: 'approved',
        },
      },
      {
        $project: {
          status: 0,
          videoPath: 0,
          videoUrl: 0,
          likes: 0,
          __v: 0,
          dislikes: 0,
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
      { $sort: { views: -1 } },
      { $skip: startIndex },
      { $limit: 20 },
    ])

    res
      .status(200)
      .json({ data: result, numberOfPages: Math.ceil(total / 20), total })
  } catch (err) {
    next(err)
  }
}
