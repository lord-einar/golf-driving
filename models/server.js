const express = require("express");
const cors = require("cors");
const { dbConnect } = require("../config/db.config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.conectarDB();
    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnect();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo JSON
    this.app.use(express.json());

    //Carpeta estatica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/gateras", require("../routes/gateras.routes"));
    this.app.use("/tipoTransaccion", require("../routes/tipoTransaccion.routes"));
    this.app.use("/transacciones", require("../routes/transacciones.routes"));
    this.app.use("/registros", require("../routes/registros.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
