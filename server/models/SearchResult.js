import mongoose from 'mongoose'

const SearchResultSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('SearchResult', SearchResultSchema)
