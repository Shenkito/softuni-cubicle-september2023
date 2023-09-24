const uniqid = require('uniqid'); // npm i uniqid -> генерира уникално ID
const cubes = [];

exports.getAll = () => cubes.slice();

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData,
    };

    cubes.push(newCube);

    return newCube;
}