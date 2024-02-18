import express, { Request, Response } from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { createProject, getAllProjects } from '../controllers/project.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/create', createProject).get("/", getAllProjects);

export default router;
