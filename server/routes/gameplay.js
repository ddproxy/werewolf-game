'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.post('/gameplay/newgame', function(req, res) {
    knex('games').insert({
        title: req.body.title,
        id: req.body.id
    }).then(function() {
        knex('users').where('username', req.body.username).update({
            game_id: req.body.id
        }).then(function(user) {
            res.send(true);
        }).catch(function(err) {
            res.send(false);
        })
    })
})

router.get('/gameplay/opengames', function(req, res){
  knex('games').then(function(games){
    res.json(games);
  })
})


module.exports = router;
