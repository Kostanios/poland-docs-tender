const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [

        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/BoxedLogin.vue')
        },
        {
            name: 'Register',
            path: '/auth/register',
            component: () => import('@/views/authentication/BoxedRegister.vue')
        },
        {
            name: 'Forgot Password',
            path: '/auth/forgot-password',
            component: () => import('@/views/authentication/BoxedForgotPassword.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/views/authentication/Error.vue')
        },
        {
            name: 'Maintenance',
            path: '/auth/maintenance',
            component: () => import('@/views/authentication/Maintenance.vue')
        },
    ]
};

export default AuthRoutes;
