const {Router} = require('express');
const { transaccionGET, transaccionesByRegistroIdGET, transaccionPOST } = require('../controllers/transacciones');



const router = Router();

router.get("/", transaccionGET);

router.get("/registros", transaccionesByRegistroIdGET);

router.post("/", transaccionPOST);


module.exports = router;