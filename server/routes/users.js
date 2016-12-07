const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');

router.post('/users', function (req, res) {
    bcrypt.hash(req.body.password, 10).then((hashpw) => {
        knex('users').insert({
            username: req.body.username,
            email: req.body.email,
            hashed_password: hashpw,
        }, 'username').then((username) => {
            res.send(username);

        })
    })
});

module.exports = router;
