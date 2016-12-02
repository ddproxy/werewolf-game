const express = require( 'express' );
const router = express.Router( {
    mergeParams: true
} );

router.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
