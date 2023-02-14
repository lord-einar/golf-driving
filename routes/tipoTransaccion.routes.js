const {Router} = require('express');
const { tipoTransaccionGET, tipoTransaccionPOST } = require('../controllers/tipoTransacciones');


const router = Router();

router.get("/", tipoTransaccionGET);

router.post("/", tipoTransaccionPOST);


module.exports = router;