import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3001;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { SigninSchema, SignupSchema } from '@workspace/common/types'
const morganFormat = ':method :url :status :response-time ms';
import { JWT_SECRET } from '@workspace/backend-common/config'
app.use(morgan(morganFormat));
app.use(helmet());
import { prisma } from '@workspace/db/client'
import bcrypt from 'bcrypt'
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
  try {
    if (!result.success) {
      res.status(400).json(result.error.format());
    } else {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: req.body.username },
            { email: req.body.email },
          ],
        }
      })
      if (user) {
        res.status(409).json({ message: "User Already Exists!" })
        return;
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        }
      })
      res.status(201).json({ message: "Signup Successfully!" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});
app.post('/signin', async (req, res) => {
  const result = SigninSchema.safeParse(req.body);
  try {
    if (!result.success) {
      res.send(result.error.format());
    } else {
      const user = await prisma.user.findFirst({ where: { username: req.body.username } })
      if (!user) {
        res.status(404).json({ message: "User Doesn't Exists!" })
        return;
      }
      const isCompared = await bcrypt.compare(req.body.password, user.password)
      if (!isCompared) {
        res.status(401).json({ message: "Invalid Credentials!" });
      } else {
        res.status(200).json(result);
      }
    }
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
});
app.get('/user', async (req, res) => {
  const result = SigninSchema.safeParse(req.body);
  try {
    if (!result.success) {
      res.send(result.error.format());
    } else {
      const user = await prisma.user.findFirst({ where: { username: req.body.username } })
      res.status(200).json({message:{id:user?.id,username:user?.username,email:user?.email}})
    }
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
});
app.listen(port, () => console.log('> Server is up and running on port: ' + port));