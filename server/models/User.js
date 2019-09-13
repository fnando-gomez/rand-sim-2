const mongoose = require('mongoose')
const message = require('./Message')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, default: true},
    friends: [this],
    messages: [message.schema],
    password: {type: String, default: true}
})

const User = mongoose.model("User", userSchema)

module.exports = User