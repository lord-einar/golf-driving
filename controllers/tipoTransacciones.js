const TipoTransaccion = require("../models/TipoTransaccion");

const tipoTransaccionGET = async (req, res) => {
  const tipoTransaccion = await TipoTransaccion.findAll();

  res.json(tipoTransaccion);
};

const tipoTransaccionPOST = async (req, res) => {
  const { nombre } = req.body;

  await TipoTransaccion.sync({ force: false });
  const transaccionDB = await TipoTransaccion.create({ nombre });

  res.json(transaccionDB);
};

module.exports = {
  tipoTransaccionGET,
  tipoTransaccionPOST,
};
