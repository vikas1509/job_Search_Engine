import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/ContextProvider.jsx';
import { FullScreenProvider } from './FullscreenContext/FulScreenProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FullScreenProvider>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
    </FullScreenProvider>
  </React.StrictMode>,
);
