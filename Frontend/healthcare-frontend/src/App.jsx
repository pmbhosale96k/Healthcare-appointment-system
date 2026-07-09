import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      document.body.setAttribute('data-theme', storedTheme);
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, []);

  return <AppRoutes />;
}

export default App;
