import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// import HomePage from '@/views/HomePage.vue'
import SignInPage from '@/views/SignInPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import SettingsPage from '@/views/SettingsPage.vue'
import { supabase } from '@/supabase';
import HomePage from '@/views/HomePage.vue';
import AppLayout from '@/views/AppLayout.vue';
import StatsPage from '@/views/StatsPage.vue';
import ActiveTrainingPage from '@/views/ActiveTrainingPage.vue';
import TrainingPage from '@/views/TrainingPage.vue';
import DogProfilePage from '@/views/DogProfilePage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'train',
        component: TrainingPage,
      },
      {
        path: 'active-training-session/:id',
        component: ActiveTrainingPage,
      },
      {
        path: 'stats',
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  console.log('beforeEach', to, from)
  const session = await supabase.auth.getSession()
  console.log('session', session)

  if (to.name !== 'Sign In' && to.name !== 'Sign Up') {
    if (!session.data.session) {
      // redirect the user to the login page
      return { name: 'Sign In' }
    }
  } else {
    if (session.data.session) {
      // redirect the user to the home page
      return { name: 'Home' }
    }
  }
})


export default router
