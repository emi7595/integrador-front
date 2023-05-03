/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { FaChalkboardTeacher, FaFileDownload } from "react-icons/fa";
import { GoReport, GoGraph } from "react-icons/go";
import GraficaClases from '../../Graficas/GraficaAsistencia';
import { CSVLink } from "react-csv";
import TablaReportarFaltasJustificadasProfesor from '../../tablas/tablasFaltasJustificadas/profesor/TablaReportarFaltasJustificadasProfesor';

const ReoprtarFaltasJustificadasProfesor = () => {
	const [data, setData] = React.useState(null);
	const [clases, setClases] = React.useState([]);
	const [today, setToday] = useState(new Date().toISOString().slice(0, 10));
	const [clave, setClave] = useState(clases && clases[0]?.classOpt);
	const [fecha, setFecha] = useState(today);
	const [horario, setHorario] = useState('7:00');
	const [razon, setRazon] = useState("7");

	useEffect(() => {
		const interval = setInterval(() => {
			setToday(new Date().toISOString().slice(0, 10));
		}, 24 * 60 * 60 * 1000);
		return () => clearInterval(interval);
	}, []);

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
			fetch("http://192.168.3.6:5096/Repositions/Professor/RepositionReports/" + nomina)
				.then(async (response) => {
					const body = await response.text();
					const data = body.length ? JSON.parse(body) : null;
					return data;
				})
				.then(json => {
					setData(json);
				})
				.catch(error => console.error(error));
			fetch("http://192.168.3.6:5096/Repositions/Professor/GetClasses/" + nomina)
				.then(response => response.json())
				.then(json => {
					setClases(json)
					setClave(json[0].idSchedule)
				})
				.catch(error => console.error(error));
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			var idCode = parseInt(razon);
			var jsonData = { "date": fecha, "startTime": horario, "idSchedule": clave, "idCode": idCode }
			console.log(jsonData)
			const response = await fetch("http://192.168.3.6:5096/Repositions/CreateRepositionReport", {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(jsonData)
			});
			if (!response.ok) {
                throw new Error("Algo salió mal.");
            }
            else {
                fetch("http://192.168.3.6:5096/Repositions/Professor/RepositionReports/" + nomina)
				.then(async (response) => {
					const body = await response.text();
					const data = body.length ? JSON.parse(body) : null;
					return data;
				})
				.then(json => {
					setData(json);
				})
				.catch(error => console.error(error));
            }
		}
		catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			{/* <SideBar usuario = {user}></SideBar> */}
			<div className="container-fluid">
				<div className="row flex-nowrap">
					<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white sidebar">
						<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
							<p className="d-flex align-items-center pb-5 mb-md-0 me-md-auto texto-udem text-decoration-none pt-4">
								<BiUserCircle className="icono-usuario"></BiUserCircle>
								<span className="p-nombre d-none d-sm-inline">{user}</span>
							</p>
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
								<li className="nav-item">
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/profesor/qr") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><BsQrCode className="icono-sidebar"></BsQrCode> Registrar asistencia</span>
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/profesor/reporte") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><GoGraph className="icono-sidebar"></GoGraph> Ver reportes</span>
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link align-middle px-0 fs-5" onClick={() => { navigate("/profesor/faltas-justificadas") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline active-link"><GoReport className="icono-sidebar"></GoReport> Reportar faltas justificadas</span>
									</a>
								</li>
							</ul>
							<hr />
						</div>
					</div>
					{ /* CONTAINERS FOR NOT SIDEBAR */}
					<div className='col-10'>
						<div className="container-fluid px-0 header mt-2 pt-4">
							<div className="row m-0 justify-content-end align-items-center">
								<div className="col-auto px-0 m-3 d-flex flex-row justify-content-center align-items-center">
									<p className="d-flex justify-content-center align-items-center m-0 pr-2 p-salir">Salir</p>
									&nbsp;&nbsp;<a href="#" onClick={() => { window.sessionStorage.clear(); navigate("/") }} className="anchor">
										<FontAwesomeIcon icon={faArrowRightFromBracket} className="icono-salir" />
									</a>&nbsp;&nbsp;
								</div>
							</div>
						</div>
						<div className="container px-0 pt-3">
							<div className="row m-0 justify-content-center mt-3">
								<div className="col-12 text-center">
									<div className="row m-0 black-card mb-2">
										<h1 className="h1-falta mt-4">Registrar Nueva Falta Justificada</h1>
										<div className="form-reportar">
											<form className="form-reportar-labels pt-5 pb-4" onSubmit={handleSubmit}>
												<div className='dropdown'>
													<label for="clave" className='label'>Clave:</label>
													<select id="clave" name="clave" value={clave} className='select-opciones' onChange={(event) => setClave(event.target.value)}>
														{clases && (
															clases?.map((clase) => (
																<option key={clase.classOpt} value={clase.classOpt}>{clase.classOpt}</option>
															))
														)
														}
													</select>
												</div>
												<div className='dropdown'>
													<label for="fecha" className='label'>Fecha de reposición:</label>
													<input name="fecha" type="date" className='select-opciones' min={today} onChange={(event) => setFecha(event.target.value)}></input>
												</div>
												<div className='dropdown'>
													<label for="horario" className='label'>Horario:</label>
													<select id="horario" name="horario" value={horario} className='select-opciones' onChange={(event) => setHorario(event.target.value)}>
														<option value="7:00">7:00</option>
														<option value="8:30">8:30</option>
														<option value="10:00">10:00</option>
														<option value="11:30">11:30</option>
														<option value="13:00">13:00</option>
														<option value="14:30">14:30</option>
														<option value="16:00">16:00</option>
														<option value="17:30">17:30</option>
														<option value="19:00">19:00</option>
														<option value="20:30">20:30</option>
													</select>
												</div>
												<div className='dropdown'>
													<label for="razon" className='label'>Razón:</label>
													<select id="razon" name="razon" className='select-opciones' value={razon} onChange={(event) => setRazon(event.target.value)}>
														<option value="7">Reponer clase perdida</option>
														<option value="8">Adelantar clase</option>
													</select>
												</div>
												<button type="submit" className='boton-registrar mb-4 mt-3'>Enviar</button>
											</form>

										</div>
									</div>
									{ /* CONTAINERS FOR QR CODE */}
									<TablaReportarFaltasJustificadasProfesor data={data}></TablaReportarFaltasJustificadasProfesor>
								</div>
							</div>
						</div>
					</div>
					{ /* END FOR NOT SIDEBAR */}
				</div>
			</div>
		</div>
	);
};

export default ReoprtarFaltasJustificadasProfesor;