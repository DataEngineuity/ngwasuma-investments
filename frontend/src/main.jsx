import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHead, UnheadProvider } from '@unhead/react/client'
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UnheadProvider head={head}>
        <App />
      </UnheadProvider>
  </React.StrictMode>
);
