import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

/**
 * ! for testing, remove before production
 */
router.get('/', async (req, res) => {
  const sellers = await prisma.seller.findMany();
  res.send(sellers)
});

// GET /sellers 🚧
/**
 * ! This needs to be changed after auth has been implemented
 */
router.get('/:sellerId', async (req, res) => {
  const sellerId = parseInt(req.params.sellerId, 10);

  if (!sellerId || isNaN(sellerId)) {
    res.status(400).json({ error: 'Invalid seller ID' });
    return
  }

  try {
    const seller = await prisma.seller.findUnique({
      where: {
        id: sellerId,
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
