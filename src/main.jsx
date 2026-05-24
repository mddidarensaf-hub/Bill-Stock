import { StrictMode } from 'react';
import "font-awesome/css/font-awesome.min.css";
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './NewBill/App'


createRoot(document.getElementById('root')).render(
  <StrictMode>

<App />

  </StrictMode>,
)
