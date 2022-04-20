import express from 'express'

const router = express.Router()

/***
 * GET v1/status
 */
router.get('/status', (req, res) => res.status(200).json({status: 'ok!'}))

export const apiV1 = router