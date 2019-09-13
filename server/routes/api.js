const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const Message = require('../models/Message').model
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

router.post('/login/', function (req, res) {
    const username = req.body.username
    const password = req.body.password

    let passE = cryptr.encrypt(password)
    console.log(passE)
    let passD = cryptr.decrypt(passE)


    User.findOne({ name: username }, function (err, existingUser) {
        const user = existingUser ?
            existingUser :
            new User({ name: username, friends: [], messages: [], password: passE })
        console.log("new User")

        if (!existingUser) {
            console.log("Save User")
            user.save()
        }
        else {
            User.findOne({ name: username }, function (err, user) {
                if (password == cryptr.decrypt(user.password)) {
                    console.log("user")
                    res.send(user)
                }
                else {
                    console.log(err)
                    res.send(err)
                }
            })

        }

    })
})

router.post('/message', function (req, res) {
    const payload = req.body
    const message = new Message({ sender: payload.sender, text: payload.text })

    User.findOne({ name: payload.to }, function (err, user) {
        user.messages.push(message)
        user.save()
        res.end()
    })
})

module.exports = router