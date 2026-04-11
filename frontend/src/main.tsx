import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { FeedProvider } from './context/feed/provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="astro-dash-theme">
      <FeedProvider>
        <App />
      </FeedProvider>
    </ThemeProvider>
  </StrictMode>,
);
