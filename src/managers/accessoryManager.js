const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();

exports.create = (accessoryData) => Accessory.create(accessoryData);

exports.getExcluding = (accessoryIds) => Accessory.find({_id: { $nin: accessoryIds }});