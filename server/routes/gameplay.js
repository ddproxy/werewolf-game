'use strict';


 const express = require('express');
 const router = express.Router();
const knex = require('../../knex');

 router.get('/gameplay/:gameid', function(req, res){
   knex('games').insert({
     title: req.body.title,
     id: req.body.id
   }).then(function(){
     res.send("yay")
   })
 })


 module.exports = router;
