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
            redirect: '/type-document',
        },
        {
            name: 'TypeDocumentCreate',
            path: '/type-document-create',
            component: () => import('@/views/dashboards/type-documents/TypeDocumentsCreate.vue'),
        },
        {
            name: 'TypeDocument',
            path: '/type-document',
            component: () => import('@/views/dashboards/type-documents/TypeDocuments.vue'),
        },
        {
            name: 'TypeDocumentEdit',
            path: '/type-document/:id',
            component: () => import('@/views/dashboards/type-documents/TypeDocumentsEdit.vue'),
        },
    ]
};

export default MainRoutes;
