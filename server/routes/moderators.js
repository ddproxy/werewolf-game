'use strict';


 const express = require('express');
 const router = express.Router();
const knex = require('../../knex');

 router.get('/moderator', function(req, res){
   res.send("moderator api");
 })


 module.exports = router;
