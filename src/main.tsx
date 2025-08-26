// Buffer polyfill for Solana wallet adapters
if (typeof window !== 'undefined') {
  (window as any).global = window;
  (window as any).Buffer = (window as any).Buffer || require('buffer').Buffer;
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
