import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LayoutView from '@/views/LayoutView.vue';
import TrainingPage from '@/views/TrainingPage.vue';
import ActiveTrainingPage from '@/views/ActiveTrainingPage.vue';
import StatsPage from '@/views/StatsPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import DogProfilePage from '@/views/DogProfilePage.vue';
import SignInPage from '@/views/SignInPage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import { supabase } from '@/supabase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LayoutView,
    children: [
      {
        path: '/',
        component: HomePage,
      },
      {
        path: '/train',
        component: TrainingPage,
      },
      {
        path: '/active-training-session/:id',
        component: ActiveTrainingPage,
      },
      {
        path: '/stats',
        component: StatsPage,
      },
      {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage,
      },
      {
        path: '/dog-profile',
        name: 'Dog Profile',
        component: DogProfilePage,
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignInPage,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUpPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const session = await supabase.auth.getSession();

  if (to.name !== 'Sign In' && to.name !== 'Sign Up') {
    if (!session.data.session) {
      // redirect the user to the login page
      return { name: 'Sign In' };
    }
  } else {
    if (session.data.session) {
      // redirect the user to the home page
      return { name: 'Home' };
    }
  }
});

export default router;
