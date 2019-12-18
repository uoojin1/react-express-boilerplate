import express from 'express'

// create an express router
const router = express.Router()

router.get('/', (req, res) => {
  res.send('successfully got db')
})

export const dbRouter = router
