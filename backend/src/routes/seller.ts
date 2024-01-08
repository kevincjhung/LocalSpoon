import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';
import { isUrlParamsNumeric } from '../../utils/validation';

/**
 * ! for testing, remove before production
 */
router.get('/', async (req, res) => {
  const sellers = await prisma.seller.findMany();
  res.send(sellers)
});

// GET /sellers 
/**
 * ! This needs to be changed after auth has been implemented
 */
router.get('/:sellerId', async (req, res) => {
  const sellerId = req.params.sellerId;

  if (isUrlParamsNumeric(sellerId)) {
    res.status(400).json({ error: 'Invalid seller ID' });
    return
  }

  try {
    const seller = await prisma.seller.findUnique({
      where: {
        id: parseInt(sellerId, 10)
      }
    });

    if (!seller) {
      res.status(404).json({ error: 'Seller not found' });
      return;
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;
