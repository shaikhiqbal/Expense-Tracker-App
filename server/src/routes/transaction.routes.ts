import { Router } from 'express';
import {
  getAllTransaction,
  createTransaction,
  searchTransaction,
} from '../controllers/transaction.controller';

const router = Router();

router.get('/transaction', getAllTransaction);
router.post('/', createTransaction);
router.get('/search-transaction', searchTransaction);

export default router;
