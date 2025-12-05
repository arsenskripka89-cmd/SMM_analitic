import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import { router as apiRouter } from './routes/index.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(json());
app.use('/api', apiRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

export { app };
