import express from 'express';
const router = express.Router();

import {prisma } from '../database-client';

// /* GET users listing. */
router.get('/', async (req, res) => {
  // const users = await prisma.user.findMany()
  res.send("users")

});


module.exports = router;
