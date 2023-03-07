const {Router} = require('express');
const { gaterasGET, gaterasPOST, gaterasActivasGET } = require('../controllers/gateras.controllers');


const router = Router();

router.get("/", gaterasGET);

router.get("/activas", gaterasActivasGET);

router.post("/", gaterasPOST);


module.exports = router;