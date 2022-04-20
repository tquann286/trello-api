import express from 'express'
import { BoardController } from '*/controllers/board.controller'

const router = express.Router()

router.route('/')
  // .get((req, res) => console.log('GET boards'))
  .post(BoardController.createNew)

export const boardRoutes = router