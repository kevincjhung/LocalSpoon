import createError from 'http-errors';
import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);


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


app.listen(3000, () => console.log(`\n⛵️Server ready at: http://localhost:3000/`))