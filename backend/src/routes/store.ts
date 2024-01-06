import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
  // get all stores
  const stores = await prisma.store.findMany();

  res.send(stores)
});


module.exports = router;
