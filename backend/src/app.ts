import createError from 'http-errors';
import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';


// Import Routers
import indexRouter from './routes/index';
import buyersRouter from './routes/buyer';
import sellerRouter from './routes/seller';
import storeRouter from './routes/store';
import analyticsRouter from './routes/analytics';
import productRouter from './routes/product';
import purchaseOrderRouter from './routes/purchase-order';
import exploreRouter from './routes/explore';

const app = express()


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Add the following lines for the preflight (OPTIONS) request
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Content-Type, cache-control');
      return res.status(200).json({});
    }
  next();
});


// Router middleware
app.use('/', indexRouter);
app.use('/api/buyers', buyersRouter);
app.use('/api/sellers', sellerRouter);
app.use('/api/stores', storeRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/products', productRouter);
app.use('/api/purchase-orders', purchaseOrderRouter);
app.use('/api/explore', exploreRouter);



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