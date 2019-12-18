import express from 'express'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { Todos } from '../models/todoModel'

// create an express router
const router = express.Router()

// api/todos/ @ this point

// retrieve all todos
router.get('/', (req, res) => {
  // create a formatted query object that excludes any undefined values
  const query = omitBy({
    username: req.query.username,
    todo: req.query.todo,
    isDone: req.query.isDone,
    hasAttachment: req.query.hasAttachment
  }, isUndefined)
  // find matching Todos
  Todos.find(query, (err, todos) => {
    if (err) throw err
    res.send(todos)
  })
})

// get a todo item by id
router.get('/:id', (req, res) => {
  Todos.findById(req.params.id, (err, todos) => {
    if (err) throw err
    res.send(todos)
  })
})

// create a todo item
router.post('/', (req, res) => {
  // extract data from request body
  const {
    username,
    todo,
    isDone,
    hasAttachment
  } = req.body
  // create new todo item
  const newTodo = Todos({
    username,
    todo,
    isDone,
    hasAttachment
  })
  // save the new todo item
  newTodo.save((err) => {
    if (err) throw err
    res.send('success')
  })
})

// update a todo item (update details in the request body)
router.put('/', (req, res) => {
  // destructure the request body
  const {
    id,
    username,
    todo,
    isDone,
    hasAttachment
  } = req.body

  Todos.findByIdAndUpdate(id, {
    username,
    todo,
    isDone,
    hasAttachment
  }, (err, todo) => {
    if (err) throw err
    res.send('success!')
  })
})

// delete a todo item
router.delete('/', (req, res) => {
  // find the todo item by id
  Todos.findByIdAndRemove(req.body.id, (err) => {
    if (err) throw err
    res.send('delete success')
  })
})

export const todosRouter = router
