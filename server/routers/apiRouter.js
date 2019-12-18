import express from 'express'
import { todosRouter } from './todosRouter'
import { dbRouter } from './dbRouter'

// create an express router
const router = express.Router()

router.use('/todos', todosRouter)

router.use('/db', dbRouter)

router.get('/', (req, res) => {
  res.send('success')
})

export const apiRouter = router
