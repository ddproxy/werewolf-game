'use strict';


 const express = require('express');
 const router = express.Router();
 var knex = require('../../db/knex');

 router.get('/moderator', function(req, res){
   res.send("moderator api");
 })


 module.exports = router;
