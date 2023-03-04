import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profesor from './components/profesor/Profesor';
import LoginFormBorrar from './views/Login/LoginFormBORRAR';
import ScanQRCode from './components/qr/ScanQRCode';
import APIPrueba from './components/api-prueba/APIPrueba';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginFormBorrar />} />
        <Route path="/qr" element={<ScanQRCode />} />
        <Route path="/api" element={<APIPrueba />} />
        <Route path="/empleado" element={<Profesor />} />
      </Routes>
    </>
  );
}

export default App;