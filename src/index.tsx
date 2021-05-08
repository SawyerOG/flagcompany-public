import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MonthlyProvider from './Containers/MonthlyRoutes/MonthlyColumn/MonthlyContext';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <MonthlyProvider>
                <App />
            </MonthlyProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
