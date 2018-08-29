const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Welcome Screen!');
    res.render('index',{title:'My Express App', message:'Hello'});
});

module.exports = router;