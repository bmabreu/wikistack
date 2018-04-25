const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 


router.get('/', function(req, res, next) {
    res.redirect('/wiki');
});

router.get('/add', function(req, res) {
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
    
    
    const pageByUrl = Page.findOne({
        where: {urlTitle: req.params.urlTitle}
    }).then((page)=>{res.render('wikipage', {page: page})});

    // .then(function(foundPage) {
    //     res.json(foundPage);
    // }).catch(next);

})

router.post('/', function(req, res, next) {
    const page = Page.build(req.body);

    page.save().then((data) => {
        res.redirect(data.route)
    }).catch(err => console.error(err));


    // page.save().then(function(savedPage){
    //     res.redirect(savedPage.route); // route virtual FTW
    // }).catch(next);
});



// router.post('/add', function(req, res) {
//     // const name = req.body.name;
//     // const email = req.body.email;
//     // const title = req.body.title;
//     // const content = req.body.content;
//     // const status = req.body.status;

//     res.json(req.body)
// })

module.exports = router;
