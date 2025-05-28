import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3001;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import {SigninSchema,SignupSchema} from '@workspace/common/types'
const morganFormat = ':method :url :status :response-time ms';
import {JWT_SECRET} from '@workspace/backend-common/config'
app.use(morgan(morganFormat));
app.use(helmet());
import { prisma } from '@workspace/db/client'

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// app.options('*', cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
// }));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('hello from simple server :)');
});
app.get('/health', async (req, res) => {
  const start = Date.now();
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date(),
    responseTime: `${Date.now() - start}ms`,
  };
  res.status(200).json(healthcheck);
});

app.post('/signup', async (req, res) => {
  const result = SignupSchema.safeParse(req.body);
  if (!result.success) {
    res.send(result.error.format());
  } else {
    const user=await prisma.user.create({
      data:req.body
    });
    res.send(user);
  }
});
app.post('/signin', (req, res) => {
  const result = SigninSchema.safeParse(req.body);
  if (!result.success) {
    res.send(result.error.format());
  } else {
    res.send(result);
  }
});
app.listen(port, () => console.log('> Server is up and running on port: ' + port));