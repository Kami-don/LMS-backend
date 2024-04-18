const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const user = require('./routes/user')
const canvas = require('./routes/canvas')
const courses = require('./routes/courses')

require('dotenv').config();

app.use(cors())

mongoose.connect(process.env.MONGODB_ATLAS_URI, {
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', user)
app.use('/canvas', canvas)
app.use('/courses', courses)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('app is on Port ' + port)
})
