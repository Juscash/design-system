import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Provider do Design System (já com tema e pt-BR por padrão)
import { DesignSystemProvider } from '@design-system/components/provider';
import ptBR from 'antd/locale/pt_BR';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <DesignSystemProvider locale={ptBR}>
      <App />
    </DesignSystemProvider>
  </React.StrictMode>
);
