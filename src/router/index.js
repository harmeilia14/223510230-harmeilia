import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import PostView from '../views/PostView.vue';
import AlbumView from '../views/AlbumView.vue';
import PhotoView from '../views/PhotoView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/posts',
    name: 'Post',
    component: PostView,
  },
  {
    path: '/albums',
    name: 'Album',
    component: AlbumView,
  },
  {
    path: '/albums/:id',
    name: 'Album Photo',
    component: PhotoView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
