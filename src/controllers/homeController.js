const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

router.get('/', (req, res) => {

    //req.params -> взимаме параметрите
    //req.body -> взимаме POST данните на формата който са пратени
    //req.query -> взимаме query stringa всичко след ? в URL`a
    const { search, from, to } = req.query;
    const cubes = cubeManager.getAll(search, from, to);

    
    res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
})

module.exports = router;