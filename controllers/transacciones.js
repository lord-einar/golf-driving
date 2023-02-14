const Transaccion = require("../models/Transaccion");

const transaccionGET = async (req, res) => {
  const transacciones = await Transaccion.findAll();

  res.json(transacciones);
};


const transaccionesByRegistroIdGET = async (req, res) => {
  const { id } = req.params;

  const transacciones = await Transaccion.findAll({
    where: { registro_id: id },
  });

  res.json(transacciones);
};

const transaccionPOST = async (req, res) => {
  const { registro_id, transaccion_id, valor } = req.body;

  await Transaccion.sync({ force: false });
  const transaccionDB = await Transaccion.create({
    registro_id,
    transaccion_id,
    valor,
  });

  res.json(transaccionDB);
};

module.exports = {
  transaccionGET,
  transaccionesByRegistroIdGET,
  transaccionPOST,
};
