import express from 'express'

const router = express.Router()

router.get('/', async(req, res) => {
    "You are in the API"
})

export default router;