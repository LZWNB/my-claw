import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import './index.css';

// i18n configuration
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    zh: {
      nav: {
        home: '首页',
        learn: '学习',
        social: '社区',
        practice: '练习',
        leaderboard: '排行榜',
        profile: '个人中心',
        pricing: '价格',
      },
      auth: {
        login: '登录',
        register: '注册',
        logout: '退出',
      },
      dashboard: {
        welcome: '欢迎回来，{name}！',
        streak: '连续打卡 {days} 天',
        continue: '继续学习',
        stats: {
          vocabulary: '词汇量',
          dailyGoal: '每日目标',
          streak: '连胜',
          ranking: '全球排名',
        },
      },
    },
    en: {
      nav: {
        home: 'Home',
        learn: 'Learn',
        social: 'Social',
        practice: 'Practice',
        leaderboard: 'Leaderboard',
        profile: 'Profile',
        pricing: 'Pricing',
      },
      auth: {
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
      },
      dashboard: {
        welcome: 'Welcome back, {name}!',
        streak: '{days} day streak',
        continue: 'Continue Learning',
        stats: {
          vocabulary: 'Vocabulary',
          dailyGoal: 'Daily Goal',
          streak: 'Streak',
          ranking: 'Global Rank',
        },
      },
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
