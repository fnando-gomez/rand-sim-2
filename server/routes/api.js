const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const Message = require('../models/Message').model
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


/*
const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);
 
console.log(encryptedString); // 5590fd6409be2494de0226f5d7
console.log(decryptedString); // bacon
*/

router.post('/login/', function (req, res) {
    const username = req.body.username
    const password = req.body.password
    console.log("new User")
    let passE = cryptr.encrypt(password)
    let passD = cryptr.decrypt(passE)

    
    User.findOne({ name: username }, function (err, existingUser) {

        const user = existingUser ?
            existingUser :
            new User({ name: username, friends: [], messages: [], password: passE })

        if (!existingUser) {
            console.log("save User")
            user.save()
        }
        else{
            
        }


        res.send(user)
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