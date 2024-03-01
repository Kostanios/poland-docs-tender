const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            name: 'Analytical',
            path: '/dashboard',
            component: () => import('@/views/dashboards/type-documents/TypeDocuments.vue'),
        },
    ]
};

export default MainRoutes;
