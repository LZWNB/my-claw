import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import VocabularyPage from '../pages/VocabularyPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import PricingPage from '../pages/PricingPage.vue';
import SocialPage from '../pages/SocialPage.vue';
import LearningPathPage from '../pages/LearningPathPage.vue';
import DictationPage from '../pages/DictationPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: LoginPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/vocabulary', component: VocabularyPage },
  { path: '/profile', component: ProfilePage },
  { path: '/pricing', component: PricingPage },
  { path: '/social', component: SocialPage },
  { path: '/learning-path', component: LearningPathPage },
  { path: '/dictation', component: DictationPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
