import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import ScanQRCode from './components/profesor/ScanQRCode';
import APIPrueba from './components/api-prueba/APIPrueba';
import Administrador from './components/administrador/Administrador';
import DirectorDepartamento from './components/director-departamento/DirectorDepartamento';
import Vicerrector from './components/vicerrector/Vicerrector';
import Rector from './components/rector/Rector';
import ConfirmQR from './components/profesor/ConfirmQR';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/profesor/qr" element={<ScanQRCode />} />
        <Route path="/profesor/qr/:nomina" element={<ConfirmQR />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/director-departamento" element={<DirectorDepartamento />} />
        <Route path="/vicerrector" element={<Vicerrector />} />
        <Route path="/rector" element={<Rector />} />
        <Route path="/api" element={<APIPrueba />} />
      </Routes>
    </>
  );
}

export default App;