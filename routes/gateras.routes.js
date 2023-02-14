const {Router} = require('express');
const { gaterasGET, gaterasPOST } = require('../controllers/gateras.controllers');


const router = Router();

router.get("/", gaterasGET);

router.post("/", gaterasPOST);


module.exports = router;