import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
  const buyers = await prisma.buyer.findMany();  
  res.send(buyers)
});


module.exports = router;
