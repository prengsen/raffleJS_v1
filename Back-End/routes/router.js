import express from 'express';

import { registerRaffleController, getRaffleIdController,
    getInfoRifaController, getRegistradosController,
    postGanadoresController} 
    from '../controllers/mainControllers.js';

const router = express.Router();

//ruta para llamar al controlador de registro.
router.post('/registrarme', registerRaffleController);

router.post('/get-raffle-id', getRaffleIdController);

router.post('/get-rifa', getInfoRifaController);

router.post('/get-registrados', getRegistradosController);

router.post('/ganadores', postGanadoresController);

export default router;