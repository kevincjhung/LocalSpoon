import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
 
 res.sendStatus(200).send();
});



// GET /analytics/stores/sales 🚧
//   Sales by Month in the Past Year for a Given Store:

// GET /analytics/stores/sales 🚧
//   Sales of Past Month for a Given Store:

// GET /analytics/stores/sales 🚧
//   Sales of Past 7 Days for a Given Store:

// GET /analytics/stores/top-selling-products 🚧
//   Top Selling Products for a Given Store with Quantity:


module.exports = router;
