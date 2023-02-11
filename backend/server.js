import express from 'express';
import cors from 'cors';
import pandas from './api/pandas.route.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/pandas', pandas);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
