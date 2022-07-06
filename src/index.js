import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Styles 
import './styles/global.css';
import './styles/variables.css';
import './styles/normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);