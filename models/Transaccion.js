const {Sequelize, DataTypes, Model } = require("sequelize");
const Registro = require("./Registro");
const TipoTransaccion = require("./TipoTransaccion");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

class Transaccion extends Model {}

Transaccion.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        registro_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tipo_transaccion_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        valor: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Transaccion",
    }
);

Transaccion.belongsTo(Registro, { foreignKey: 'registro_id'});
Registro.hasMany(Transaccion, { foreignKey: 'registro_id'});
Transaccion.belongsTo(TipoTransaccion, { foreignKey: 'tipo_transaccion_id'});
TipoTransaccion.hasMany(Transaccion, { foreignKey: 'tipo_transaccion_id'});


module.exports = Transaccion;
