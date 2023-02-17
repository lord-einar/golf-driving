const { ajustarHora, sumarMinutos } = require("../helpers/funciones");
const Registro = require("../models/Registro");
const Transaccion = require("../models/TipoTransaccion");
const moment = require("moment");

const registrosGET = async (req, res) => {
  const registros = await Registro.findAll({
    include: { model: Transaccion, attributes: ["nombre"] },
  });

  res.json(registros);
};

const registrosByIdGET = async (req, res) => {
  const { id } = req.params;

  const registros = await Registro.findAll({ where: { id } });

  res.json(registros);
};

const registrosPOST = async (req, res) => {
  const { gatera_id, pelotas, minutos } = req.body;
  hora_inicio = moment().utc().local().format("YYYY-MM-DD HH:mm:ss.SSS");
  hora_fin = sumarMinutos(hora_inicio, minutos);

  await Registro.sync({ force: false });
  const registroDB = await Registro.create({
    gatera_id,
    pelotas,
    hora_inicio,
    hora_fin,
  });

  registroDB.hora_inicio = ajustarHora(registroDB.hora_inicio);
  registroDB.hora_fin = ajustarHora(registroDB.hora_fin);

  res.json(registroDB);
};

module.exports = {
  registrosGET,
  registrosByIdGET,
  registrosPOST,
};
