import express, { Request, Response } from 'express';
const router = express.Router();

import { prisma } from '../database-client';

/** 
 *  GET /api/explore/?page={page}&pageSize={pageSize}
 * 
 *  @throws {404} No buyers found.
 *  @throws {500} Internal Server Error.
*/
router.get('/', async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const pageSize: number = parseInt(req.query.pageSize as string, 10) || 100;

    const offset = (page - 1) * pageSize;

    // TODO: Pass in the actual params to implement keyset pagination

    // Keyset pagination
    const productInfo = await prisma.$queryRaw`
      SELECT
        "Product".name,
        "Product".description,
        "Product".id AS product_id,
        "ProductPhoto".resource_url,
        "Store".id AS store_id,
        "Store".store_name AS store_name,
        "Store".store_description AS store_description,
        "Product".price AS price
      FROM
        "Product"
        LEFT JOIN "ProductPhoto" ON "Product".id = "ProductPhoto".product_id
        LEFT JOIN "Store" ON "Store".id = "Product".store_id
      WHERE
        "Product".id > ${page}
      ORDER BY
        "Product".id ASC, "Product".name ASC
      LIMIT 10;
    `;
    

    res.status(200).json(productInfo)
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;