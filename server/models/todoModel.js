import mongoose from 'mongoose'

const Schema = mongoose.Schema

// create the schema for a todo
const todoSchema = new Schema({
  username: String,
  todo: String,
  isDone: Boolean,
  hasAttachment: Boolean
})

// create a mongoose model called 'Todos' and export the model
export const Todos = mongoose.model('Todos', todoSchema)
