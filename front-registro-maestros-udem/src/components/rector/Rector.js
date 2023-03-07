import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rector = () => {
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
      case 4:
        navigate("/vicerrector");
        break;
    }
  }, []);
  // Component (HTML)
  return (
    <>
      <div>Rector</div>
    </>
  );
};

export default Rector;