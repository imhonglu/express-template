const defaultRoutes = [
    'create',
    'retrieve',
    'update',
    'delete',
];

function autoRoutes(router, routes) {
    for (const [routeName, route] of Object.entries(routes)) {
        const isDefaultRoute = defaultRoutes.includes(routeName);
        const path = isDefaultRoute ? '' : routeName;

        const {
            params = '',
            method = 'GET',
            default: handler,
        } = route;

        const url = `/${path}/${params}`;
        router[method.toLowerCase()](url, handler);
    }
}

export default autoRoutes;
