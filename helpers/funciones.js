const ajustarHora = (hora) => {
  return moment(hora).subtract(3, "hours").format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sumarMinutos = (hora_inicial, minutos) => {
  const fechaSumada = moment(hora_inicial).add(minutos, "minutes");
  return fechaSumada.local().format("YYYY-MM-DD HH:mm:ss.SSS");
};

module.exports = {
  ajustarHora,
  sumarMinutos,
};
