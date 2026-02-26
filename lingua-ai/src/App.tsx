import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import './i18n';
import './index.css';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { VocabularyPage } from './pages/VocabularyPage';

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    // 初始化主题
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter basename="/my-claw">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
