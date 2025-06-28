// src/main.jsx
import 'primereact/resources/themes/lara-dark-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './App.js';
import RegistroPonto from './components/registro-ponto.jsx';

// Você pode criar outros componentes como Relatórios depois
const Relatorios = () => <div>📊 Em breve: Relatórios!</div>;
const Login = () => <div>📊 Em breve: Login!</div>;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="registro-ponto" element={<RegistroPonto />} />
          <Route path="relatorios" element={<Relatorios />} />
           <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
