import React, { useState } from 'react';

const LoginForm = () => {
  // Form inputs
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  
  // Backgroung image
  var urlImg = "/imgs/udem-bg.jpg";
  var udemLogo = "/imgs/udem-logo.png"
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
    <div className="container px-4 py-5 mx-auto contenedor">
    <div className="card card0">
        <div className="d-flex flex-lg-row flex-column-reverse contenedor2">
            <div className="card card1 cardizquierda">
                <div className="row justify-content-center my-auto">
                    <div className="col-md-8 col-10 my-5">
                        <div className="row justify-content-center px-3 mb-3">
                            <img id="logo" src={udemLogo}/>
                        </div>
                        <h3 className="mb-5 text-center heading">Registro de asistencia de profesores</h3>

                        {/* <h6 className="msg-info">Registro de asistencia de profesores</h6> */}

                        <div className="form-group">
                            <label className="form-control-label text-muted">Usuario</label>
                            <input type="text" id="email" name="email" placeholder="Usuario" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label className="form-control-label text-muted">Pin</label>
                            <input type="password" id="psw" name="psw" placeholder="Pin" className="form-control"/>
                        </div>

                        <div className="row justify-content-center my-3 px-3">
                            <button className="btn-block btn-color">Login</button>
                        </div>

                        {/* <div className="row justify-content-center my-2">
                            <a href="#"><small className="text-muted">Forgot Password?</small></a>
                        </div> */}
                    </div>
                </div>
                {/* <div className="bottom text-center mb-5">
                    <p href="#" className="sm-text mx-auto mb-3">Don't have an account?<button className="btn btn-white ml-2">Create new</button></p>
                </div> */}
            </div>
            <div className="card card2 card-derecha">
                <div className="my-auto mx-md-5 px-md-5 right">
                </div>
            </div>
        </div>
    </div>
  </div>
  );
};

export default LoginForm;