import express from 'express';
const router = express.Router();

import { signUp, applicationRequest } from '../../controllers/staff/staffController.js';

router.post('/signup', signUp);
router.post('/application-request', applicationRequest);

export default router;