import express from 'express';
import PandasController from './pandas.controller.js';

const router = express.Router();

router.route('/').get(PandasController.apiGetPandas);

export default router;
