import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

/**
 * ! for testing, remove before production
 */
router.get('/', async (req, res) => {
  const stores = await prisma.store.findMany();

  res.send(stores)
});

// GET /stores 🚧
//   Retrieve all stores

// GET /stores/{storeId} 🚧
//   Retrieve a specific store

// POST /stores 🚧
//   Create a new store

// GET /stores/{storeId}/purchase-orders 🚧
//   Retrieve all purchase orders for a specific store

// GET /stores/{storeId}/photos 🚧
//   Retrieve all photos for a specific store

// GET /stores/{storeId}/products 🚧
//   Retrieve all products for a specific store


module.exports = router;
