import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import ScanQRCode from './components/qr/ScanQRCode';
import APIPrueba from './components/api-prueba/APIPrueba';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/qr" element={<ScanQRCode />} />
        <Route path="/api" element={<APIPrueba />} />
      </Routes>
    </>
  );
}

export default App;