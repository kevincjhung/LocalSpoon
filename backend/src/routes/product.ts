import express, { Request, Response } from 'express';
const router = express.Router();

import { prisma } from '../database-client';
import { isUrlParamsNumeric } from '../../utils/validation'

/**
 * ! for testing, remove before production
 * 
 * GET /api/product
 * 
 * Retrieves all products.
 * 
 * @throws {404} No buyers found.
 * @throws {500} Internal Server Error.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (!products || products.length === 0) {
      res.status(404).json({ error: 'Products not found' });
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * GET /api/product/:id
 * 
 * Retrieves a product by ID.
 * 
 * @throws {404} No buyers found.
 * @throws {500} Internal Server Error.
 * 
 */
router.get('/:id', async (req: Request, res: Response) => {
  const productId: string = req.params.id;

  if (!isUrlParamsNumeric(productId)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId, 10),
      },
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

 
/**
 * GET /api/products/{productId}/photos
 * Retrieves all photos for a specific product.
 *
 * @param {string} productId - The unique identifier of the product.
 * 
 * @throws {400} Bad Request - If the provided productId is not a valid number.
 * @throws {404} Not Found - If no product with the specified ID is found.
 * @throws {500} Internal Server Error - If there's an unexpected server error.
 */
router.get('/:productId/photos', async (req: Request, res: Response) => {
  const productId: string = req.params.productId;

  // Use a regular expression to check if the entire string is a valid number
  if (isUrlParamsNumeric(productId)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }

  const parsedProductId = parseInt(productId, 10);

  try {
    const productPhotos = await prisma.productPhoto.findMany({
      where: {
        product_id: parsedProductId,
      },
    });

    if (!productPhotos || productPhotos.length === 0) {
      res.status(404).json({ error: 'Product photos not found' });
      return;
    }

    res.status(200).json(productPhotos);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;