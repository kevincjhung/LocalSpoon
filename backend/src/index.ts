import express from 'express'

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


const app = express()

app.use(express.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', async (req, res) => {
  res.json({ hello: 'world' })
})

app.post('/', async (req, res) => {
  const { name, email } = req.body
  res.json({ name, email })
})


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
});


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000/users`),
)
