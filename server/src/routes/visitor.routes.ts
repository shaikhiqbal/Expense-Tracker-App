import express from 'express';
import { trackVisit, submitFeedback, getAllVisitors } from '../controllers/visitor.controller';

const router = express.Router();

router.post('/visitors', trackVisit);
router.post('/visitors/feedback', submitFeedback);
router.get('/visitors', getAllVisitors);

export default router;