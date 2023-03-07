const moment = require("moment");
const Gatera = require("../models/Gatera");
const Registro = require("../models/Registro");
const Transaccion = require("../models/Transaccion");

const ajustarHora = (hora) => {
  return moment(hora).subtract(3, "hours").format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sumarMinutos = (hora_inicial, minutos) => {
  const fechaSumada = moment(hora_inicial).add(minutos, "minutes");
  return fechaSumada.local().format("YYYY-MM-DD HH:mm:ss.SSS");
};

const altaRegistro = async (gatera_id, pelotas, minutos) => {
  hora_inicio = moment().utc().local().format("YYYY-MM-DD HH:mm:ss.SSS");
  hora_fin = sumarMinutos(hora_inicio, minutos);

  const registroDB = await Registro.create({
    gatera_id,
    pelotas,
    hora_inicio,
    hora_fin,
  });

  registroDB.hora_inicio = ajustarHora(hora_inicio);
  registroDB.hora_fin = ajustarHora(hora_fin);

  return registroDB;
};

const activarGatera = async (gatera_id, registro_id) => {
  await Gatera.sync({ force: false });

  const gateraON = await Gatera.update(
    { active: true, registro_id },
    { where: { id: gatera_id } }
  );

  return gateraON;
};

const addTransaccion = async (registro_id, tipo_transaccion_id, operacion) => {
  await Transaccion.sync({ force: true });

  try {
    const transaccion = Transaccion.create({
      registro_id,
      tipo_transaccion_id,
      operacion,
    });

    return transaccion;
  } catch (error) {
    return error;
  }
};

module.exports = {
  ajustarHora,
  sumarMinutos,
  altaRegistro,
  activarGatera,
  addTransaccion,
};
