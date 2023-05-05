import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter> 
        <App />
    </BrowserRouter>
)