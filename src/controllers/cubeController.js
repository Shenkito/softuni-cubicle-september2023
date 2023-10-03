const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

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
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();
    console.log(cube);

    if (!cube) {
        return res.redirect('/404');
    }

    console.log(cube._id);
    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getExcluding(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories })
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId)

    res.redirect(`/cubes/${cubeId}/details`)
});

module.exports = router;