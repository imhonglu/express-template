import { Router } from 'express';
import { requireDirectory } from '~/utils';

const router = Router();
const routes = requireDirectory(({ caseName: 'none' }));

for (const [prefix, route] of Object.entries(routes)) {
    router.use(`/${prefix}`, route);
}

export default router;
