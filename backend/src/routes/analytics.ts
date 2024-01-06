import express from 'express';
const router = express.Router();

import { prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
 res.status(200).send('analytics router');
});


module.exports = router;
