const Gateras = require("../models/Gatera");



const gaterasGET = async (req, res) => {

  const gateras = await Gateras.findAll({ where :{active: 1}});

  res.json(gateras);
};

const gaterasPOST = async (req, res) => {

  const { nombre } = req.body;

  await Gateras.sync({ force: false });
  const gateraDB = await Gateras.create({nombre});

  res.json(gateraDB);

};

module.exports = {
  gaterasGET,
  gaterasPOST
};
