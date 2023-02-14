const {Router} = require('express');
const { registrosGET, registrosPOST, registrosByIdGET } = require('../controllers/registros');


const router = Router();

router.get("/", registrosGET);

router.get("/:id", registrosByIdGET);

router.post("/", registrosPOST);


module.exports = router;