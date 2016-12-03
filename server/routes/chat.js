const express = require( 'express' );
const router = express.Router( {
    mergeParams: true
} );
const environment = process.env.NODE_ENV || "development";


router.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});


module.exports = router;
