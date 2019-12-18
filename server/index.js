import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

// create express app
const app = express()

const port = process.env.PORT || 3000

const DIST_DIR = path.join(__dirname, '../dist')

const HTML_FILE = path.join(DIST_DIR, 'index.html')

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.use(express.static(DIST_DIR))

// use standard Apache common log output.
app.use(logger('common'))

app.use(express.json())

app.use(express.urlencoded({
  extended: false
}))

app.use(cookieParser());

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE)
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});