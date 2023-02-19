import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import PandasDAO from './dao/pandasDAO';
import pandas from './api/pandas.route';

dotenv.config();

const port = process.env.PORT || 8000;

const app: Express = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/pandas', pandas);
app.use('*', (req: Request, res: Response) =>
  res.status(404).json({ error: 'not found' })
);

MongoClient.connect(process.env.PANDAS_DB_URI as string, {
  wtimeoutMS: 2500,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await PandasDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`⚡️ Server is running on port ${port}`);
    });
  });
