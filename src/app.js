import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './config/errorHandler.js';
import { contextMiddleware } from './config/contextMiddleware.js'
import indexRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Contexto que setea tx
app.use(contextMiddleware);

app.use('/api', indexRouter);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  (`Servidor corriendo en http://localhost:${PORT}`);
});