import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
  // get all sellers
  const sellers = await prisma.seller.findMany();

  res.send(sellers)
});


module.exports = router;
