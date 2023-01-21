import express from 'express'
import {
  addSearchResult,
  getAllSearch,
  getSearchResult,
} from '../controller/searchController.js'

const router = express.Router()

router.get('/get/:value', getSearchResult)
router.get('/add/:value', addSearchResult)
router.get('/getAll', getAllSearch)

export default router
