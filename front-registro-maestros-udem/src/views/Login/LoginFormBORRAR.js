// import { useState } from 'react';
// // import { useSession } from 'react-session';
// import { useNavigate } from 'react-router-dom';
// import { ReactSession } from "react-client-session";
import React, { useState } from 'react';
//import { useClientSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginForm = () => {

    var api =axios.create({
        baseURL: "http://localhost:4000",
      });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // const { session, setSession } = useSession();
    const navigate = useNavigate();
    //const { session, setSession } = useClientSession();

    // Backgroung image
    var urlImg = "/imgs/udem-bg.jpg";
    var udemLogo = "/imgs/udem-logo.png"

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            var jsonData = {
                    "user": username,
                    "pin": password
            }
            console.log(JSON.stringify(jsonData));
            const response = await fetch('http://localhost:5096/Login', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
            
            // body: JSON.stringify({ username, password }),
          });

        // var jsonData = {
        //                 "user": "emiliano.aguilar",
        //                 "pin": "Prueba1!"
        //         }

        //     var response = await api.post("http://localhost:5096/Login", jsonData)
    
          if (!response.ok) {
            throw new Error('Invalid username or password');
          }
          
          const data = await response.json();
          console.log(response)
          window.sessionStorage.setItem('session', JSON.stringify(data));
        } catch (error) {
          setError(error.message);
        }
        const session = JSON.parse(window.sessionStorage.getItem('session'));
      console.log(session);
      if (session) {
        navigate('/api')
      }
      };

      

    // Component (HTML)
    return (
        <div className="container px-4 py-5 mx-auto contenedor">
        <div className="card card0">
            <div className="d-flex flex-lg-row flex-column-reverse contenedor2">
                <div className="card card1 cardizquierda">
                    <div className="row justify-content-center my-auto">
                        <form onSubmit={handleLogin} className="col-md-8 col-10 my-5">
                            <div className="row justify-content-center px-3 mb-3">
                                <img id="logo" src={udemLogo}/>
                            </div>
                            <h3 className="mb-5 text-center heading">Registro de asistencia de profesores</h3>

                            {/* <h6 className="msg-info">Registro de asistencia de profesores</h6> */}

                            <div className="form-group">
                                <label className="form-control-label text-muted">Usuario</label>
                                <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" id="email" name="email" placeholder="Usuario" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label className="form-control-label text-muted">Pin</label>
                                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="psw" name="psw" placeholder="Pin" className="form-control"/>
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
    );
};

export default LoginForm;