import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WalletConnectProvider } from '@btc-vision/walletconnect';
import App from './App';
import './index.css';

// OPWA Cursor — split pill branco/laranja diagonal
const _cur = document.createElement('div');
_cur.id = 'cur';
document.body.appendChild(_cur);
document.addEventListener('mousemove', (e) => {
  _cur.style.left = e.clientX + 'px';
  _cur.style.top  = e.clientY + 'px';
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <WalletConnectProvider theme="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletConnectProvider>
  </React.StrictMode>
);
