import express, { Request, Response } from 'express';
const router = express.Router();

import { prisma } from '../database-client';
import { isUrlParamsNumeric } from '../../utils/validation';



/** 
 *  GET /api/analytics/stores/{storeId}/purchase-orders-count-by-month
 *  Number of purchase orders for a given store in the past {numberOfMonths} months.
 * 
 *  @throws {404} No buyers found.
 *  @throws {500} Internal Server Error.
 */
router.get('/stores/:storeId/purchase-orders', async (req: Request, res: Response) => {
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
 *  GET /api/analytics/stores/{storeId}/sales-by-month
 *  Total sales amount for a given store in the past {numberOfMonths} months.
 *  
 *  @throws {404} No buyers found.
 *  @throws {500} Internal Server Error.
 */
router.get('/stores/:storeId/sales-by-month', async (req: Request, res: Response) => {
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



/** 
 *  GET /analytics/stores/:storeId/sales 
 *  Sales of Past 7/14/30/180 Days for a Given Store:
 * 
 *  @throws {400} Invalid or missing parameters.
 *  @throws {500} Internal Server Error.
 */
router.get('/stores/:storeId/sales', async (req: Request, res: Response) => {
  const storeId: number = parseInt(req.params.storeId as string, 10);
  const numberOfDays: number = parseInt(req.query.numberOfDays as string, 10);

  if (!isUrlParamsNumeric(storeId.toString()) || isNaN(numberOfDays)) {
    res.status(400).json({ error: 'Invalid or missing parameters' });
    return;
  }

  try {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - numberOfDays);

    const pastSales = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('day', po.purchase_date) AS day,
        SUM(pr.price * poa.quantity) AS total_sales_amount
      FROM "PurchaseOrderProductAssociation" AS poa
      LEFT JOIN "PurchaseOrder" AS po
        ON poa.purchase_order_id = po.id
      LEFT JOIN "Product" AS pr
        ON poa.product_id = pr.id AND pr.store_id = ${storeId}
      WHERE pr.store_id = ${storeId}
        AND po.purchase_date >= ${currentDate.toISOString()}::date
      GROUP BY day
      ORDER BY day DESC;`;

    res.status(200).json(pastSales);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/** 
 *  GET /analytics/stores/:storeId/top-selling-products
 *  Top Selling Products for a Given Store with Quantity:
 * 
 *  @throws {400} Invalid or missing parameters.
 *  @throws {500} Internal Server Error.
 */
router.get('/stores/:storeId/top-selling-products', async (req: Request, res: Response) => {
  const storeId: number = parseInt(req.params.storeId as string, 10);

  if (!isUrlParamsNumeric(storeId.toString())) {
    res.status(400).json({ error: 'Invalid or missing parameters' });
    return;
  }

  try {
    const topSellingProducts = await prisma.$queryRaw`
     SELECT
        poa.product_id, pr.name, pr.price, pr.description,
        SUM(poa.quantity)::int AS total_quantity
      FROM "PurchaseOrderProductAssociation" AS poa
      LEFT JOIN "PurchaseOrder" AS po
        ON poa.purchase_order_id = po.id
      LEFT JOIN "Product" AS pr
        ON poa.product_id = pr.id AND pr.store_id = ${storeId}
      WHERE pr.store_id = ${storeId}
      GROUP BY poa.product_id, pr.name, pr.price, pr.description
      ORDER BY total_quantity DESC;
    `;

    res.status(200).json(topSellingProducts)
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/** 
 *  GET /analytics/stores/:storeId/top-revenue-products
 *  Products that generated the most revenue for a given store
 *  
 *  @throws {400} Invalid or missing parameters.
 *  @throws {500} Internal Server Error.
 */
router.get('/stores/:storeId/top-revenue-products', async (req: Request, res: Response) => {
  const storeId: number = parseInt(req.params.storeId as string, 10);

  if (!isUrlParamsNumeric(storeId.toString())) {
    res.status(400).json({ error: 'Invalid or missing parameters' });
    return;
  }

  try {
    const topRevenueProducts = await prisma.$queryRaw`
      SELECT
        poa.product_id, pr.name, pr.price, pr.description,
        SUM(poa.quantity)::int AS total_quantity,
        MAX(pr.price * poa.quantity) AS highest_total_price
      FROM "PurchaseOrderProductAssociation" AS poa
      LEFT JOIN "PurchaseOrder" AS po
        ON poa.purchase_order_id = po.id
      LEFT JOIN "Product" AS pr
        ON poa.product_id = pr.id
      WHERE pr.store_id = ${storeId}
      GROUP BY poa.product_id, pr.name, pr.price, pr.description
      ORDER BY total_quantity DESC;
    `

    res.status(200).json(topRevenueProducts)
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;