import express from 'express'
const router = express.Router()

import {
  block,
  getUser,
  googleAuth,
  unBlock,
} from '../controller/userController.js'

router.post('/google', googleAuth)
router.post('/block/:userId', block)

router.patch('/unblock/:userId', unBlock)

router.get('/find/:userId', getUser)

export default router
