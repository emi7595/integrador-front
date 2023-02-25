import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import QRCode from './components/qrcode/QRCode';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/qr" element={<QRCode />} />
      </Routes>
    </>
  );
}

export default App;