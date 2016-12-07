const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

router.post('/token', function (req, res) {
    knex('users').where('username', req.body.username).then((user) => {
        bcrypt.compare(req.body.password, user[0].hashed_password)
            .then(() => {
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
            .catch(bcrypt.MISMATCH_ERROR, () => {
                res.sendStatus(501);
            })
            .catch(() => {
                res.sendStatus(501);
            });
    });
});

router.get('/me', function (req, res) {
    // (req.headers.authorization);
    jwt.verify(req.headers.authorization, 'secret', function (err, decoded) {
        if (decoded) {
            res.send(decoded)
        } else {
            res.sendStatus(401)
        }
    })
});

module.exports = router;
