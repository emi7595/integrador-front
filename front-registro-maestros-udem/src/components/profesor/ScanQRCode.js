import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { AES } from 'crypto-js';

const ScanQRCode = () => {
	const navigate = useNavigate();
	let user, nomina;

	// Get session storage information
	const session = JSON.parse(window.sessionStorage.getItem('session'));
	if (session) {
		user = session.nombre;
		nomina = session.nomina;
	}

	useEffect(() => {
		// If user is logged in...
		if (session) {
			// Redirect to proper role if necessary
			switch (session.idRol) {
				case 2:
					navigate("/administrador"); break;
				case 3:
					navigate("/director-departamento"); break;
				case 4:
					navigate("/vicerrector"); break;
				case 5:
					navigate("/rector"); break;
				default: break;
			}
			// Get current class that the professor is on
			fetch("http://192.168.29.1:5096/QR/GetCourseData/" + nomina)
				.then(response => response.json())
				.then(data => {
					// The professor is currently on class
					if (data !== -1)
						document.getElementById("currentClass").innerHTML = "Clase actual: " + data.subjectName;
					// The professor isn't currently on class
					else
						document.getElementById("currentClass").innerHTML = "No hay clases en este momento";
				});
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);

	// --- FUNCTION THAT GENERATES A QR CODE FOR THE CURRENT CLASS ---
	const getQRCode = function (nomina, type) {
		fetch("http://192.168.29.1:5096/QR/GetCourseData/" + nomina)
			.then(response => response.json())
			.then(data => {
				// The professor is currently on class
				if (data !== -1) {
					// Generate token for unique QR Code (based on current date)
					var encrypted = AES.encrypt(new Date().toString(), "secret_key").toString().replaceAll("/", "slash");
	
					// Define the QR code component
					const QRCode = ({ nomina }) => (
						<QRCodeSVG value={`http://192.168.29.1:3000/profesor/qr/${nomina}/` + (type === 1 ? `1` : `2`) + `/` + encrypted} size={250} />
					);
	
					// Render the QR code component to a string
					const qrCodeString = ReactDOMServer.renderToString(<QRCode nomina={nomina} />);
	
					// Render QR code and link to HTML component
					document.getElementById("currentClass").innerHTML = "Clase actual: " + data.subjectName;
					document.getElementById("qrCode").innerHTML = qrCodeString;
					document.getElementById("qrLink").innerHTML = "O haga clic <a href='" + ("http://192.168.29.1:3000/profesor/qr/" + nomina + "/" + (type === 1 ? "1" : "2") + "/" + encrypted) + "' target='_blank'>aquí</a>";
				}
				// There are currently no classes; QR code can't be generated
				else {
					document.getElementById("currentClass").innerHTML = "No hay clases en este momento";
					document.getElementById("qrCode").innerHTML = "No se puede generar un código QR porque no hay clases.";
				}
			});
	}


	// --- COMPONENT (HTML) ---
	return (
		<>
			<div className="container-fluid px-0 header">
				<div className="row m-0 justify-content-between align-items-center">
					<div className="col-auto px-0">
						<img src="/imgs/udem-logo.png" height="60" alt="Universidad de Monterrey" />
					</div>
					<div className="col-auto px-0">
						{user}&nbsp;&nbsp;<a href="#" onClick={() => { window.sessionStorage.clear(); navigate("/") }} className="anchor">
							<FontAwesomeIcon icon={faArrowRightFromBracket} />
						</a>&nbsp;&nbsp;
					</div>
				</div>
			</div>
			<div className="container px-0">
				<div className="row m-0 justify-content-center mt-5">
					<div className="col-12 text-center">
						<h1 className="mb-3" id="currentClass"></h1>
						<h3 className="mb-3">Escanee el código QR desde su celular para registrar su asistencia.</h3>
						<div className="row justify-content-center my-3 px-3">
							<div className="col-12 col-md-6">
								<div className="row justify-content-center mb-3">
									<div className="col-6">
										<button className="btn-block btn-color w-100" onClick={() => getQRCode(nomina, 1)}>Registrar Entrada</button>
									</div>
									<div className="col-6">
										<button className="btn-block btn-color w-100" onClick={() => getQRCode(nomina, 2)}>Registrar Salida</button>
									</div>
								</div>
							</div>
						</div>
						{ /* CONTAINERS FOR QR CODE */ }
						<div id="qrCode"></div>
						<div id="qrLink" className="mt-2"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ScanQRCode;