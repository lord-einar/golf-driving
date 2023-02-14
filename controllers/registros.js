const Registro = require("../models/Registro");
const Transaccion = require("../models/TipoTransaccion");
const moment = require("moment");

const sumarMinutos = (minutos) => {
  const fecha = moment.utc().tz('America/Argentina/Buenos_Aires', true).format("YYYY-MM-DD HH:mm:ss");
  console.log(fecha)  
  // const fechaSumada = moment(fecha).add(minutos, "minutes");
  // return fechaSumada.format("YYYY-MM-DD HH:mm:ss");
}


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
  hora_inicio = moment().format("YYYY-MM-DD HH:mm:ss");
  hora_fin = sumarMinutos(minutos);

  // await Registro.sync({ force: false });
  // const registroDB = await Registro.create({ gatera_id, pelotas, hora_inicio, hora_fin });

  // res.json(registroDB);
};

module.exports = {
  registrosGET,
  registrosByIdGET,
  registrosPOST,
};
