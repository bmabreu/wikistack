const express = require('express');
const router = express.Router();
const wiki = require('./wiki.js');
const user = require('./user.js');

router.use('/wiki', wiki);
router.use('/user', user);

router.get('/', function(req, res, next) {
    res.send('im here');
})

module.exports = router;