import express from 'express';
const router = express.Router();

import { getList,createList,deleteList } from '../controllers/listController.js';

import { protect,admin } from '../middleware/authMiddleware.js';

router.route('/').get(getList).post(protect,createList);
router.route('/:id').delete(protect,admin,deleteList);

export default router;