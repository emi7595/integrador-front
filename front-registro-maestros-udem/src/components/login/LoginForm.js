import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  var udemLogo = "/imgs/udem-logo.png"

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      var jsonData = {
        "user": username,
        "pin": password
      }

      const response = await fetch('http://localhost:5096/Login', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });

      // Login information was incorrect
      if (!response.ok) {
        throw new Error('Usuario o contraseña inválidos.');
      }
      // Login information was correct
      else {
        const data = await response.json();
        window.sessionStorage.setItem('session', JSON.stringify(data));

        const session = JSON.parse(window.sessionStorage.getItem('session'));

        console.log(session);

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
          case 5:
            navigate("/rector");
            break;
        }
      }
    } catch (error) {
      const toast = new Toast(document.getElementById("login-toast"));
      toast.show();
      document.getElementById("login-error-content").innerHTML = error.message;
    }
  };



  // Component (HTML)
  return (
    <>
      <div className="container px-4 py-5 mx-auto contenedor">
        <div className="card card0">
          <div className="d-flex flex-lg-row flex-column-reverse contenedor2">
            <div className="card card1 cardizquierda">
              <div className="row justify-content-center my-auto">
                <form onSubmit={handleLogin} className="col-md-8 col-10 my-5">
                  <div className="row justify-content-center px-3 mb-3">
                    <img id="logo" src={udemLogo} />
                  </div>
                  <h3 className="mb-5 text-center heading">Registro de asistencia de profesores</h3>

                  {/* <h6 className="msg-info">Registro de asistencia de profesores</h6> */}

                  <div className="form-group">
                    <label className="form-control-label text-muted">Usuario</label>
                    <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" id="email" name="email" placeholder="Usuario" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label className="form-control-label text-muted">Pin</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="psw" name="psw" placeholder="Pin" className="form-control" />
                  </div>

                  <div className="row justify-content-center my-3 px-3">
                    <button className="btn-block btn-color">Login</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card card2 card-derecha">
              <div className="my-auto mx-md-5 px-md-5 right">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="login-toast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Error</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body" id="login-error-content"></div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;