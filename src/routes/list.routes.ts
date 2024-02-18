import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { createList, getAllLists } from '../controllers/list.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/create', createList).get("/:folderId", getAllLists);

export default router;
