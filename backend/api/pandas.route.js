import express from 'express';
import PandasController from './pandas.controller.js';

const router = express.Router();

router.route('/').get(PandasController.apiGetPandas);

// getting the detail of a single panda
router.route('/:id').get(PandasController.apiGetPandaById);

export default router;
