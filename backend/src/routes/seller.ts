import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

router.get('/', async (req, res) => {
  const sellers = await prisma.seller.findMany();
  res.send(sellers)
});

// GET /sellers 🚧
// get seller by ID

module.exports = router;
