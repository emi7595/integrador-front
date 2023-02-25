import React, { useState } from 'react';

const LoginForm = () => {
  // Form inputs
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  
  // Backgroung image
  var urlImg = "/imgs/udem-bg.jpg";
  const imageBg = {
    backgroundImage: 'url("'+urlImg+'")',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  // Login (submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    console.log(password);
  };

  // Component (HTML)
  return (
    <div style={ imageBg }>
      <div className="container-fluid px-0 banner">
        <img src="/imgs/udem-logo.png" alt="Universidad de Monterrey" height="80" />
        <p>Registro de asistencia de profesores</p>
      </div>
      <div className="container px-0 login-bg">
        <div className="col-12 col-md-3 mt-5">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-4">
              <label for="user" className="form-label">Usuario</label>
              <input type="text" className="form-control" id="user" onChange={(e) => setUser(e.target.value)}/>
            </div>
            <div className="mb-4">
              <label for="password" className="form-label">Pin</label>
              <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <button type="submit" className="cta">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;