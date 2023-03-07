const Gateras = require("../models/Gatera");
const Registro = require("../models/Registro");



const gaterasGET = async (req, res) => {

  const gateras = await Gateras.findAll({order: [['nombre', 'ASC']]});

  res.json(gateras);
};

const gaterasActivasGET = async (req, res) => {

  const gateras = await Gateras.findAll({ where :{active: 1}, include: Registro});

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
  gaterasPOST,
  gaterasActivasGET
};
