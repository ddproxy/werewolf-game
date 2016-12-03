'use strict';


 const express = require('express');
 const router = express.Router();
 var knex = require('../../db/knex');

 router.get('/gameplay', function(req, res,){
   res.send("gameplay api");
 })


 module.exports = router;
