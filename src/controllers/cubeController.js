const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');

//Path /cubes/create
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    // Резултата е документ , като lean го парса в чист обект.
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    console.log(cube._id);
    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', (req, res) => {
    res.render('accessory/attach')
});

module.exports = router;