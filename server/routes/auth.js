'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

router.post('/token', function(req, res) {
    knex('users').where('username', req.body.username).then((user) => {
        bcrypt.compare(req.body.password, user[0].hashed_password)
            .then(function(data) {
                knex('users').where('username', req.body.username).then((user) => {

                    var token = jwt.sign({
                        iss: "Werewolf Game",
                        username: user[0].username

                    }, 'secret', {
                        expiresIn: '4h'
                    });
                    res.send(token)
                })
            })
            .catch(bcrypt.MISMATCH_ERROR, function(data) {
                res.sendStatus(501);
            })
            .catch(function(data) {
                res.sendStatus(501);
            });
    });
});

router.get('/me', function(req, res) {
    jwt.verify(req.headers.authorization, 'secret', function(err, decoded) {
      if (decoded) {
        res.send(decoded)
      } else {
        res.sendStatus(501)
      }
    })

})



module.exports = router;
