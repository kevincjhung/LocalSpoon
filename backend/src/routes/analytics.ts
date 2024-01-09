import express, {Request, Response} from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
 
 res.status(200).send('analytics');
});



// GET /analytics/stores/sales 🚧
//   Sales by Month in the Past Year for a Given Store:

/**
 * ! for production, use auth to get storeId instead of query params
 * 
 * GET /api/analytics/stores/sales
 * 
 * @throws {404} No buyers found.
 * @throws {500} Internal Server Error.
 * 
 * 
 */
router.get('/store/sales', async (req: Request, res: Response) => {
  const storeId = req.query.storeId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    // get today's date

    



    res.status(200).json({storeId, startDate, endDate});
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});














// GET /analytics/stores/sales 🚧
//   Sales of Past Month for a Given Store:

// GET /analytics/stores/sales 🚧
//   Sales of Past 7 Days for a Given Store:

// GET /analytics/stores/top-selling-products 🚧
//   Top Selling Products for a Given Store with Quantity:


module.exports = router;
