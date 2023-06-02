import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';

const LoginForm = () => {
	const navigate = useNavigate();

	// Username and password fields of login form
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [attemptCount, setAttemptCount] = useState(
		parseInt(localStorage.getItem("attemptCount")) || 0
	);
	const maxAttempts = 3;

	const [isBlocked, setIsBlocked] = useState(
		localStorage.getItem("isBlocked") === "true"
	);
	
	const [blockedUntil, setBlockedUntil] = useState(
		localStorage.getItem("blockedUntil")
	);

	// Variable for image src
	var udemLogo = "/imgs/udem-logo.png";

	// --- FUNCTION THAT SUBMITS THE LOGIN FORM ----
	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			if (isBlocked) {
				const now = new Date().getTime();
				if (blockedUntil && now < blockedUntil) {
					const remainingTime = Math.round((blockedUntil - now) / 1000 / 60); // Tiempo restante en minutos8
					throw new Error(`Tu cuenta está bloqueada. Vuelve a intentarlo en ${remainingTime} minutos.`)
				}
				setIsBlocked(false);
				localStorage.removeItem("isBlocked");
				setBlockedUntil(null);
				localStorage.removeItem("blockedUntil");
			}
			// Form data
			var jsonData = {
				"user": username,
				"pin": password
			}

			// Post request to database
			const response = await fetch('http://192.168.29.1:5096/Login', {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(jsonData)
			});

			// Login information was incorrect
			if (!response.ok) {
				incrementAttemptCount(attemptCount);
				throw new Error('Usuario o contraseña inválidos.');
			}
			// Login information was correct
			else {
				const data = await response.json();
				// Store login information in session storage
				window.sessionStorage.setItem('rol', JSON.stringify(data.idRol));
				window.sessionStorage.setItem('session', JSON.stringify(data));
				localStorage.setItem("attemptCount", 0);
				setAttemptCount(0);
				const session = JSON.parse(window.sessionStorage.getItem('session'));

				// Redirect to proper rol
				switch (session.idRol) {
					case 1:
						navigate("/profesor/qr"); break;
					case 2:
						navigate("/administrador"); break;
					case 3:
						navigate("/director-departamento"); break;
					case 4:
						navigate("/vicerrector"); break;
					case 5:
						navigate("/rector"); break;
					case 6:
						navigate("/decano"); break;
					default: break;
				}
			}
		} catch (error) {
			// Show toast message indicating that the login information is incorrect
			const toast = new Toast(document.getElementById("login-toast"));
			toast.show();
			document.getElementById("login-error-content").innerHTML = error.message;
		}
	};

	const incrementAttemptCount = (currentCount) => {
		const newCount = currentCount + 1;
		if (newCount >= maxAttempts) {
			const blockedUntilTimestamp = new Date().getTime() + 1 * 60 * 1000; // Tiempo actual + 15 minutos en milisegundos
			localStorage.setItem("blockedUntil", blockedUntilTimestamp);
			setBlockedUntil(blockedUntilTimestamp);
			localStorage.setItem("isBlocked", true);
			setIsBlocked(true);
		} else {
			setAttemptCount(newCount);
		}
	};


	// --- COMPONENT (HTML) ---
	return (
		<>
			<div className="container px-4 py-3 mx-auto contenedor">
				<div className="card card0">
					<div className="d-flex flex-lg-row flex-column-reverse contenedor2">
						<div className="card card1 cardizquierda">
							<div className="row justify-content-center my-auto">
								<form onSubmit={handleLogin} className="col-md-8 col-10 my-5">
									<div className="row justify-content-center px-3 mb-3">
										<img id="logo" src={udemLogo} alt="Universidad de Monterrey" />
									</div>
									<h3 className="mb-5 text-center heading">Registro de asistencia de profesores</h3>

									{ /* User input */}
									<div className="form-group">
										<label className="form-control-label text-muted">Usuario</label>
										<input value={username} onChange={(event) => setUsername(event.target.value)} type="text" id="email" name="email" placeholder="Usuario" className="form-control" />
									</div>

									{ /* Password input */}
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
							<div className="my-auto mx-md-5 px-md-5 right"></div>
						</div>
					</div>
				</div>
			</div>

			{ /* TOAST MESSAGE THAT APPEARS WHEN LOGIN INFORMATION IS INCORRECT */}
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