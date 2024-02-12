import express, { Request, Response } from 'express';
const router = express.Router();

import { prisma } from '../database-client';
import { isUrlParamsNumeric } from '../../utils/validation';



/**
 * GET /api/purchase-orders/buyer/{buyerId}
 * 
 * Retrieves all purchase orders from a single buyer by buyer id.
 * 
 * @throws {404} No purchase orders found.
 * @throws {500} Internal Server Error.
 */
router.get('/buyer/:buyerId', async (req: Request, res: Response) => {
  const buyerId: string = req.params.buyerId;

  if (!buyerId || isNaN(parseInt(buyerId, 10))) {
    res.status(400).json({ error: 'Invalid purchase order ID' });
    return
  }
  
  try {
    const purchaseOrder = await prisma.purchaseOrder.findMany({
      where: {
        buyer_id: parseInt(buyerId, 10),
      }
    });

    if (!purchaseOrder || purchaseOrder.length === 0) {
      res.status(404).json({ error: 'Purchase order(s) not found' });
      return;
    }

    res.status(200).json(purchaseOrder);
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/**
 * GET /api/purchase-orders/stores/{storeId} 
 * 
 * Retrieves all purchase orders from a single store by store id.
 * 
 * @throws {404} No purchase orders found.
 * @throws {500} Internal Server Error.
 */
router.get('/stores/:storeId', async (req: Request, res: Response) => {
  const storeId: string = req.params.storeId;

  if (isUrlParamsNumeric(storeId)) {
    res.status(400).json({ error: 'Invalid purchase order ID' });
    return
  }
  
  try {
    const purchaseOrders: [] = await prisma.$queryRaw`
      SELECT po.*, pr.*, s.store_name
      FROM "PurchaseOrderProductAssociation" AS poa
      LEFT JOIN "PurchaseOrder" AS po
      ON poa.purchase_order_id = po.id
      LEFT JOIN "Product" as pr
      ON poa.product_id = pr.id
      LEFT JOIN "Store" as s
      ON pr.store_id = s.id
      WHERE pr.store_id = ${parseInt(storeId, 10)}
    `;

    if (!purchaseOrders || purchaseOrders.length === 0) {
      res.status(404).json({ error: 'Purchase order(s) not found' });
      return;
    }

    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;