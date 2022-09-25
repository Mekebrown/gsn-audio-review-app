import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { UserGlobalContextProvider } from "./components/tools/user-context/UserGlobalContextProvider";

const root = createRoot(document.getElementById('root'));

root.render(<UserGlobalContextProvider><App /></UserGlobalContextProvider>);
