const express = require('express');
const router = express.Router();

router.get('/moderator', function (req, res) {
    res.send("moderator api");
});

module.exports = router;
