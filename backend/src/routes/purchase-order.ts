import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
  // get all purchase-order
  const purchaseOrders = await prisma.purchaseOrder.findMany();

  res.send(purchaseOrders)
});


module.exports = router;
