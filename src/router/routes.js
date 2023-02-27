
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'connexion', component: () => import('pages/ConnexionPage.vue') },
      { path: 'rooms', component: () => import('pages/RoomsPage.vue') },
      { path: 'sensors', component: () => import('pages/SensorsPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
