import express, { Request, Response } from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {

  res.status(200).send('analytics');
});


/**
 *  GET /api/analytics/stores/{storeId}/purchase-orders-count-by-month
 * 
 *  Returns the number of purchase orders for a given store in the past {numberOfMonths} months.
 * 
 * @throws {404} No buyers found.
 * @throws {500} Internal Server Error.
 */
router.get('/store/:storeId/purchase-orders', async (req: Request, res: Response) => {
  const storeId: number = parseInt(req.params.storeId as string, 10);
  const numberOfMonths: number = parseInt(req.query.numberOfMonths as string, 10);

  if (isNaN(storeId) || isNaN(numberOfMonths)) {
    throw new Error('Invalid or missing parameters');
  }

  try {
    const salesByMonth = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', po.purchase_date) AS month,
        COUNT(*)::int AS "Number Of Purchase Orders"
      FROM "PurchaseOrderProductAssociation" AS poa
      LEFT JOIN "PurchaseOrder" AS po
          ON poa.purchase_order_id = po.id
      LEFT JOIN "Product" AS pr
          ON poa.product_id = pr.id
      WHERE pr.store_id = ${storeId}
      GROUP BY month
      ORDER BY month desc
      LIMIT ${numberOfMonths};
    `

    res.status(200).json(salesByMonth)
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/**
 * GET /api/analytics/stores/{storeId}/sales-by-month
 * 
 * Returns the total sales amount for a given store in the past {numberOfMonths} months.
 * 
 * @throws {404} No buyers found.
 * @throws {500} Internal Server Error.
 */
router.get('/store/:storeId/sales-by-month', async (req: Request, res: Response) => {
  const storeId: number = parseInt(req.params.storeId as string, 10);
  const numberOfMonths: number = parseInt(req.query.numberOfMonths as string, 10);

  if (isNaN(storeId) || isNaN(numberOfMonths)) {
    throw new Error('Invalid or missing parameters');
  }

  try {
    const salesByMonth = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', po.purchase_date) AS month,
        SUM(pr.price * poa.quantity)::int AS total_sales_amount
      FROM "PurchaseOrderProductAssociation" AS poa
      LEFT JOIN "PurchaseOrder" AS po
        ON poa.purchase_order_id = po.id
      LEFT JOIN "Product" AS pr
        ON poa.product_id = pr.id
      WHERE pr.store_id = ${storeId}
      GROUP BY month
      ORDER BY month desc
      LIMIT ${numberOfMonths};
    `

    res.status(200).json(salesByMonth)
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET /analytics/stores/sales 🚧
//   Sales of Past 7/14/30/180 Days for a Given Store:


// GET /analytics/stores/top-selling-products 🚧
// '/api/analytics/stores/{storeId}/top-selling-products'
//   Top Selling Products for a Given Store with Quantity:


module.exports = router;
