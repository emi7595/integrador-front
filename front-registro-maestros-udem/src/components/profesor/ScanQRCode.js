/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { AES } from 'crypto-js';
import { BsCheck2Square } from "react-icons/bs";
import { TbDoorExit } from "react-icons/tb";
import SidebarProfesor from './sidebar/SidebarProfesor';

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
			fetch("http://192.168.3.6:5096/QR/GetCourseData/" + nomina)
				.then(response => response.json())
				.then(data => {
					// The professor is currently on class
					if (data !== -1) {
						document.getElementById("currentClass").innerHTML = "Clase actual: " + data.subjectName;
						document.getElementById("classInfo1").innerHTML = "<b>CRN:</b> " + data.CRN;
						document.getElementById("classInfo2").innerHTML = "<b>Clave:</b> " + data.subject_CVE;
						document.getElementById("classInfo3").innerHTML = "<b>Hora de Inicio:</b> " + data.startHour + "&emsp;&emsp;<b>Hora Final:</b> " + data.endHour;
					}
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
		fetch("http://192.168.3.6:5096/QR/GetCourseData/" + nomina)
			.then(response => response.json())
			.then(data => {
				// The professor is currently on class
				if (data !== -1) {
					// Generate token for unique QR Code (based on current date)
					var encrypted = AES.encrypt(new Date().toString(), "secret_key").toString().replaceAll("/", "slash");
	
					// Define the QR code component
					const QRCode = ({ nomina }) => (
						<QRCodeSVG value={`http://192.168.3.6:3000/profesor/qr/${nomina}/` + (type === 1 ? `1` : `2`) + `/` + encrypted} size={250} />
					);
	
					// Render the QR code component to a string
					const qrCodeString = ReactDOMServer.renderToString(<QRCode nomina={nomina} />);
	
					// Render QR code and link to HTML component
					document.getElementById("currentClass").innerHTML = "Clase actual: " + data.subjectName;
					document.getElementById("classInfo1").innerHTML = "<b>CRN:</b> " + data.CRN;
					document.getElementById("classInfo2").innerHTML = "<b>Clave:</b> " + data.subject_CVE;
					document.getElementById("classInfo3").innerHTML = "<b>Hora de Inicio:</b> " + data.startHour + "&emsp;&emsp;<b>Hora Final:</b> " + data.endHour;
					document.getElementById("qrCode").innerHTML = qrCodeString;
					document.getElementById("qrLink").innerHTML = "O haga clic <a href='" + ("http://192.168.3.6:3000/profesor/qr/" + nomina + "/" + (type === 1 ? "1" : "2") + "/" + encrypted) + "' target='_blank'>aquí</a>";
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
		<div>
			<div className="container-fluid">
    			<div className="row flex-nowrap">
        			<SidebarProfesor user={user}></SidebarProfesor>
					{ /* CONTAINERS FOR NOT SIDEBAR */ }
					<div className='col-10'>
						<div className="container-fluid px-0 header mt-2 pt-4">
							<div className="row m-0 justify-content-end align-items-center">
								<div className="col-auto px-0 m-3 d-flex flex-row justify-content-center align-items-center">
									<p className="d-flex justify-content-center align-items-center m-0 pr-2 p-salir">Salir</p>
									&nbsp;&nbsp;<a href="#" onClick={() => { window.sessionStorage.clear(); navigate("/") }} className="anchor">
										<FontAwesomeIcon icon={faArrowRightFromBracket} className="icono-salir"/>
									</a>&nbsp;&nbsp;
								</div>
							</div>
						</div>
						<div className="container px-0 pt-3">
							<div className="row m-0 justify-content-center">
								<div className="col-12 text-center">
									<h1 className="mb-2 " id="currentClass"></h1>
									<p className="mb-1 p-escanear" id="classInfo1"></p>
									<p className="mb-1 p-escanear" id="classInfo2"></p>
									<p className="mb-4 p-escanear" id="classInfo3"></p>
									<h3 className="mb-0 p-escanear">Escanee el código QR desde su celular para registrar su asistencia.</h3>
									<div className="row justify-content-center my-3 px-3 pb-2">
										<div className="col-12 col-md-6">
											<div className="row justify-content-center mb-3">
												<div className="col-6">
													<button className="btn-block btn-color boton-qr w-100" onClick={() => getQRCode(nomina, 1)}><BsCheck2Square></BsCheck2Square>  Registrar Entrada</button>
												</div>
												<div className="col-6">
													<button className="btn-block btn-color boton-qr w-100" onClick={() => getQRCode(nomina, 2)}><TbDoorExit></TbDoorExit>  Registrar Salida</button>
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
					</div>
					{ /* END FOR NOT SIDEBAR */ }
    			</div>
			</div>
		</div>
	);
};

export default ScanQRCode;