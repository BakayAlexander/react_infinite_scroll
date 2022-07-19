import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/pages/App';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
