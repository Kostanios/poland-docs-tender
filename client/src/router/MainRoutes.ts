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
            name: 'DocumentGroups',
            path: '/document-groups',
            component: () => import('@/views/dashboards/document-groups/DocumentGroups.vue'),
        },
        {
            name: 'DocumentGroupsEdit',
            path: '/document-groups/:id',
            component: () => import('@/views/dashboards/document-groups/DocumentGroupEdit.vue'),
        },
        {
            name: 'DocumentNames',
            path: '/document-name',
            component: () => import('@/views/dashboards/document-names/DocumentNames.vue'),
        },
        {
            name: 'DocumentNamesCreate',
            path: '/document-name-create',
            component: () => import('@/views/dashboards/document-names/DocumentNameCreate.vue'),
        },
        {
            name: 'DocumentNameEdit',
            path: '/document-name/:id',
            component: () => import('@/views/dashboards/document-names/DocumentNameEdit.vue'),
        },
        {
            name: 'TypeDocument',
            path: '/type-document',
            component: () => import('@/views/dashboards/type-documents/TypeDocuments.vue'),
        },
        {
            name: 'TypeDocumentCreate',
            path: '/type-document-create',
            component: () => import('@/views/dashboards/type-documents/TypeDocumentsCreate.vue'),
        },
        {
            name: 'TypeDocumentEdit',
            path: '/type-document/:id',
            component: () => import('@/views/dashboards/type-documents/TypeDocumentsEdit.vue'),
        },
    ]
};

export default MainRoutes;
