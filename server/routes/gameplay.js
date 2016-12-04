'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.post('/gameplay/newgame', function(req, res) {
    console.log(req.body);
    knex('games').insert({
        title: req.body.title,
        id: req.body.id
    }).then(function() {
        console.log("after the game call: " + req.body.username + req.body.id);
        knex('users').where('username', req.body.username).update({
            game_id: req.body.id
        }).then(function(user) {
            console.log("is it real " + user);
            res.send(true);
        }).catch(function(err) {
            console.log(err);
            res.send(false);
        })
    })
})


module.exports = router;
