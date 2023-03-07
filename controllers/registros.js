const { altaRegistro, activarGatera, addTransaccion } = require("../helpers/funciones");
const Registro = require("../models/Registro");
const Transaccion = require("../models/TipoTransaccion");

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
  const { gatera_id, tipo_transaccion_id, operacion, pelotas, minutos } = req.body;

  await Registro.sync({ force: false });
  let registroDB;
  await altaRegistro(gatera_id, pelotas, minutos)
    .then((response) => {
      registroDB = response;
      activarGatera(gatera_id, registroDB.id);
    }).then(() => {
      addTransaccion(registroDB.id, tipo_transaccion_id, operacion)
    })
    .then(() => {
      registroDB = {
        registroDB,
        msg: "Gatera activada",
      };
    })
    .catch((err) => {
      console.log(err);
    });


  res.json(registroDB);
};

module.exports = {
  registrosGET,
  registrosByIdGET,
  registrosPOST,
};
