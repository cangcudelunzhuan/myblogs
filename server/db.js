const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:32768/blogs')

const userSchema = new mongoose.Schema({
  name: String,
  password: String
})

const articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  content: String,
  gist: String,
  labels: Array,
  auther:String
})

const tagSchema = new mongoose.Schema({
  content: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Tag:mongoose.model('Tag', tagSchema)
}

module.exports = Models
