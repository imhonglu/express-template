import refineData from '~/middlewares/refine-data';

const defaultRoutes = [
    'create',
    'retrieve',
    'update',
    'delete',
];

function autoRoutes({ router, routes }) {
    for (const [routeName, route] of Object.entries(routes)) {
        const isDefaultRoute = defaultRoutes.includes(routeName);
        const path = isDefaultRoute ? '' : routeName;

        const {
            allowedData = [],
            params = '',
            method = 'GET',
            default: handler,
        } = route;

        if (allowedData.length !== 0) {
            router.use(refineData(allowedData));
        }
        const url = `/${path}/${params}`;
        router[method.toLowerCase()](url, handler);
    }
}

export default autoRoutes;
