import express from 'express';
import PandasController from './pandas.controller.js';

const router = express.Router();

router.route('/').get(PandasController.apiGetPandas);

// getting the detail of a single panda
router.route('/:id').get(PandasController.apiGetPandaById);

// creating a new panda
router.route('/').post(PandasController.apiCreatePanda);

// updating a panda
router.route('/:id').put(PandasController.apiUpdatePanda);

// deleting a panda
router.route('/:id').delete(PandasController.apiDeletePanda);

export default router;
