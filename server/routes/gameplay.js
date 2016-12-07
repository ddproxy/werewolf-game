const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.post('/gameplay/newgame', (req, res) => {
    knex('games').insert({
        title: req.body.title,
        id: req.body.id
    }).then(() => {
        knex('users').where('username', req.body.username).update({
            game_id: req.body.id
        }).then(()=> {
            res.send(true);
        }).catch(()=> {
            // throw err;
            res.send(false);
        })
    })
});

router.get('/gameplay/opengames', (req, res) => {
    knex('games').then((games) => {
        res.json(games);
    });
});

module.exports = router;
