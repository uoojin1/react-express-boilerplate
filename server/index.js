import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import { apiRouter }  from './routers/apiRouter'

// connect to the database
mongoose.connect('mongodb+srv://admin:test@cluster0-07nnv.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// create express app
const app = express()

const port = process.env.PORT || 3000

const DIST_DIR = path.join(__dirname, '../dist')

const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))

// use standard Apache common log output.
app.use(logger('common'))

app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))

app.use(cookieParser());

// use the apiRouter for /api routes
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE)
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});