// Libraries
import express, { Request, Response } from 'express';
import { prisma } from '../database-client';

// Helper Functions
import { isUrlParamsNumeric, validateStoreInputType } from '../../utils/validation'

const router = express.Router();



/**
 *  GET /stores
 *  
 *  Retrieves all stores 
 *  
 *  @throws {404} No stores found.
 *  @throws {500} Internal Server Error.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const stores = await prisma.store.findMany();

    if (!stores || stores.length === 0) {
      res.status(404).json({ error: 'Stores(s) not found' });
      return;
    }

    res.status(200).json(stores);
  } catch (error) {
    console.error('Error fetching purchase order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/**
 *  GET /api/stores/{storeId}
 *  
 *  Retrieves a single store by store id.
 *  
 *  @throws {404} No stores found with given id.
 *  @throws {500} Internal Server Error.
 */
router.get('/:storeId', async (req: Request, res: Response) => {
  const storeId: string = req.params.storeId;

  if (!isUrlParamsNumeric(storeId)) {
    res.status(400).json({ error: 'Invalid purchase order ID' });
    return
  }

  try {
    const store = await prisma.store.findMany({
      where: {
        id: parseInt(storeId, 10),
      }
    });

    if (!store || store.length === 0) {
      res.status(404).json({ error: 'No stores found with given id' });
      return;
    }

    res.status(200).json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/**
 * POST /stores
 * Creates a new store
 * 
 * @throws {400} Invalid store input.
 * @throws {500} Internal Server Error.
 */
router.post('/', async (req: Request, res: Response) => {
  const {
    store_name,
    store_description,
    supports_delivery,
    store_delivery_radius,
    address,
    city,
    state_province,
    zipcode,
    country
  } = req.body;

  // Validate data types
  const errors = [
    validateStoreInputType(store_name, 'string', 'store_name'),
    validateStoreInputType(store_description, 'string', 'store_description'),
    validateStoreInputType(supports_delivery, 'boolean', 'supports_delivery'),
    validateStoreInputType(store_delivery_radius, 'number', 'store_delivery_radius'),
    validateStoreInputType(address, 'string', 'address'),
    validateStoreInputType(city, 'string', 'city'),
    validateStoreInputType(state_province, 'string', 'state_province'),
    validateStoreInputType(zipcode, 'string', 'zipcode'),
    validateStoreInputType(country, 'string', 'country'),
  ].filter(error => error !== null);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const store = await prisma.store.create({
      data: {
        store_name,
        store_description,
        supports_delivery,
        store_delivery_radius,
        address,
        city,
        state_province,
        zipcode,
        country,
      }
    });

    res.status(200).json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



/**
 *  GET /stores/{storeId}/photos 🚧
 *  
 *  Retrieve all photos for a specific store
 *  
 *  @throws {404} No photos found.
 *  @throws {500} Internal Server Error.
 */
router.get('/:storeId/photos', async (req: Request, res: Response) => {
  const storeId: string = req.params.storeId;


  if (!isUrlParamsNumeric(storeId)) {
    res.status(400).json({ error: 'Invalid store ID' });
    return;
  }

  try {
    const store = await prisma.store.findMany({
      where: {
        id: parseInt(storeId, 10),
      }
    });

    if (!store) {
      res.status(404).json({ error: 'store not found' });
      return;
    }
    if (store.length === 0) {
      res.status(404).json({ error: 'store has no photos' });
      return;
    }

    res.status(200).json(storeId);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/**
 *  GET /stores/{storeId}/products 🚧
 *  
 *  Retrieve all products for a specific store
 *  
 *  @throws {404} No products found.
 *  @throws {500} Internal Server Error.
 */
router.get('/:storeId/products', async (req: Request, res: Response) => {
  const storeId: string = req.params.storeId;


  if (!isUrlParamsNumeric(storeId)) {
    res.status(400).json({ error: 'Invalid store ID' });
    return;
  }

  try {
    const store = await prisma.product.findMany({
      where: {
        store_id: parseInt(storeId, 10),
      }
    });

    if (!store) {
      res.status(404).json({ error: 'store not found' });
      return;
    }
    if (store.length === 0) {
      res.status(404).json({ error: 'store has no products' });
      return;
    }

    res.status(200).json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;