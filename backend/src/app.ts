import createError from 'http-errors';
import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Import Routers
const indexRouter = require('./routes/index');
const buyersRouter = require('./routes/buyer');
const sellerRouter = require('./routes/seller');
const storeRouter = require('./routes/store');
const analyticsRouter = require('./routes/analytics');
const productRouter = require('./routes/product');
const purchaseOrderRouter = require('./routes/purchase-order');


const app = express()

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router middleware
app.use('/', indexRouter);
app.use('/api/buyers', buyersRouter);
app.use('/api/sellers', sellerRouter);
app.use('/api/stores', storeRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/products', productRouter);
app.use('/api/purchase-orders', purchaseOrderRouter);


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


app.listen(3000, () => console.log(`\n Server ready at: http://localhost:3000/`))