import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
  // get all products
  const products = await prisma.product.findMany();

  res.send(products)
});


module.exports = router;
