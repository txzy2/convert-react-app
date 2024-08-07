import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import App from './App';
import {ThemeProvider} from './shared/context/ChangeTheme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
