const {Sequelize, DataTypes, Model } = require("sequelize");
const Gatera = require("./Gatera");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

class Registro extends Model {}

Registro.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gatera_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pelotas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Registro",
  }
);

Registro.belongsTo(Gatera, { foreignKey: 'gatera_id'});
Gatera.hasMany(Registro, { foreignKey: 'gatera_id'});

module.exports = Registro;
