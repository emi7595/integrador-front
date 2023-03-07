import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Vicerrector = () => {
  const navigate = useNavigate();
  const session = JSON.parse(window.sessionStorage.getItem('session'));
  useEffect(() => {
    switch (session.idRol) {
      case 1:
        navigate("/profesor/qr");
        break;
      case 2:
        navigate("/administrador");
        break;
      case 3:
        navigate("/director-departamento");
        break;
      case 5:
        navigate("/rector");
        break;
    }
  }, []);
  // Component (HTML)
  return (
    <>
      <div>Vicerrector</div>
    </>
  );
};

export default Vicerrector;