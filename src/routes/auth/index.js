import { Router } from 'express';
import {
    requireDirectory,
    autoRoutes,
} from '~/utils';

const router = Router();
const routes = requireDirectory(({ caseName: 'none' }));

autoRoutes({ router, routes });

export default router;
