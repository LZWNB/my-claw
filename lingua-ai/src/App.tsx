import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import './i18n';
import './index.css';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { VocabularyPage } from './pages/VocabularyPage';

const router = createHashRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <LoginPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/vocabulary', element: <VocabularyPage /> },
]);

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <RouterProvider router={router} />;
}

export default App;
