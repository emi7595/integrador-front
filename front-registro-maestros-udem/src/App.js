import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import ScanQRCode from './components/qr/ScanQRCode';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/qr" element={<ScanQRCode />} />
      </Routes>
    </>
  );
}

export default App;