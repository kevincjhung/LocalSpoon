import express, { Request, Response } from 'express';
const router = express.Router();

import { prisma } from '../database-client';
import { ro } from '@faker-js/faker';

/**
 * ! for testing, remove before production
 * 
 * GET /api/buyers
 * 
 * @throws {404} No buyers found.
 * @throws {500} Internal Server Error.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const buyer = await prisma.buyer.findMany();

    if (!buyer || buyer.length === 0) {
      res.status(404).json({ error: 'Buyers not found' });
      return;
    }
    res.status(200).json(buyer);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * GET /api/buyers/:id
 * Retrieves a buyer by ID.
 *
 * @param {string} req.params.id - The ID of the buyer to retrieve.
 * @returns {Object} The buyer object.
 * @throws {404} Buyer not found.
 * @throws {500} Internal Server Error.
 *
 * TODO: This currently accepts the ID from the params. It will need to be changed after auth implementation.
 */
router.get('/:id', async (req: Request, res: Response) => {
  const buyerId: string = req.params.id;
  // get buyerId from query params
  

  if (!buyerId || isNaN(parseInt(buyerId, 10))) {
    res.status(400).json({ error: 'Invalid buyer ID' });
  }
  
  try {
    const buyer = await prisma.buyer.findUnique({
      where: {
        id: parseInt(buyerId, 10),
      },
    });

    if (!buyer) {
      res.status(404).json({ error: 'Buyer not found' });
      return;
    }

    res.status(200).json(buyer);
  } catch (error) {
    console.error('Error fetching buyer by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;