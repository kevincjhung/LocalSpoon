import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';


router.get('/', async (req, res) => {
  // get all products
  const products = await prisma.product.findMany();

  res.send(products)
});



// GET /products 🚧
//   Retrieve all products

// GET /products/{productId} 🚧
//   Retrieve a specific product

// GET /products/{productId}/photos 🚧
//   Retrieve all photos for a specific product

module.exports = router;
