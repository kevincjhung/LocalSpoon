import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';


router.get('/', async (req, res) => {
  const purchaseOrders = await prisma.purchaseOrder.findMany();

  res.send(purchaseOrders)
});



// GET /api/purchase-orders/buyers 🚧
//   Retrieve all purchase orders for a specific buyer

// GET /api/purchase-orders/stores/{storeId} 🚧
//   Retrieve all purchase orders for a specific store

module.exports = router;
