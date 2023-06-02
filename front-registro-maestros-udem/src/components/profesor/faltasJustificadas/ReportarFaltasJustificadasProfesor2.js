/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// Components
import SidebarProfesor from '../sidebar/SidebarProfesor';
import TablaReportarFaltasJustificadasProfesor from '../../tablas/tablasFaltasJustificadas/profesor/TablaReportarFaltasJustificadasProfesor';

const ReportarFaltasJustificadasProfesor = () => {
	const [data, setData] = React.useState(null);
	const [clases, setClases] = React.useState([]);
	const [today, setToday] = useState(new Date().toISOString().slice(0, 10));
	const [clave, setClave] = useState(clases && clases[0]?.classOpt);
	const [fecha, setFecha] = useState(today);
	const [salon, setSalon] = useState("");
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
			fetch("http://192.168.29.1:5096/Repositions/Professor/RepositionReports/" + nomina)
				.then(async (response) => {
					const body = await response.text();
					const data = body.length ? JSON.parse(body) : null;
					return data;
				})
				.then(json => {
					setData(json);
				})
				.catch(error => console.error(error));
			fetch("http://192.168.29.1:5096/Repositions/Professor/GetClasses/" + nomina)
				.then(response => response.json())
				.then(json => {
					setClases(json);
					setClave(json[0].idSchedule);
				})
				.catch(error => console.error(error));
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);

	// --- FUNCTION THAT CREATES A REPOSITION REPORT IN DATABASE ---
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			var idCode = parseInt(razon);
			var jsonData = { "date": fecha, "startTime": horario, "idSchedule": clave, "idCode": idCode }
			const response = await fetch("http://192.168.29.1:5096/Repositions/CreateRepositionReport", {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(jsonData)
			});
			if (!response.ok) {
                throw new Error("Algo salió mal.");
            }
            else {
                fetch("http://192.168.29.1:5096/Repositions/Professor/RepositionReports/" + nomina)
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

	// --- FUNCTION THAT CREATES AN EXTERNAL UNIT REPORT IN DATABASE ---
	const handleSubmitExt = async (event) => {
		event.preventDefault();
		try {
			var jsonData = { "date": fecha, "startTime": horario, "idSchedule": clave, "classroom": salon }
			const response = await fetch("http://192.168.29.1:5096/Repositions/CreateExternalUnitReport", {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(jsonData)
			});
			if (!response.ok) {
                throw new Error("Algo salió mal.");
            }
            else {
                fetch("http://192.168.29.1:5096/Repositions/Professor/RepositionReports/" + nomina)
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

	const [value, setValue] = React.useState('reposiciones');

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};


	// --- COMPONENT (HTML) ---
	return (
		<div>
			<div className="container-fluid">
				<div className="row flex-nowrap">
					<SidebarProfesor user={user}></SidebarProfesor>
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
										<Box sx={{ width: '100%' }} className="pt-4">
											<Tabs
												value={value}
												onChange={handleChange}
												textColor="secondary"
												indicatorColor="secondary"
												aria-label="secondary tabs example"
											>
												<Tab value="reposiciones" label="Reposiciones" />
												<Tab value="externas" label="Unidades Externas" />
											</Tabs>
											</Box>
										<div className="form-reportar">
											{value === 'reposiciones' ? (<form className="form-reportar-labels pt-3 pb-4" onSubmit={handleSubmit}>
												<div className='dropdown'>
													<label htmlFor="clave" className='label'>Clave:</label>
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
													<label htmlFor="fecha" className='label'>Fecha de reposición:</label>
													<input name="fecha" type="date" className='select-opciones' min={today} onChange={(event) => setFecha(event.target.value)}></input>
												</div>
												<div className='dropdown'>
													<label htmlFor="horario" className='label'>Horario:</label>
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
													<label htmlFor="razon" className='label'>Razón:</label>
													<select id="razon" name="razon" className='select-opciones' value={razon} onChange={(event) => setRazon(event.target.value)}>
														<option value="7">Reponer clase perdida</option>
														<option value="8">Adelantar clase</option>
													</select>
												</div>
												<button type="submit" className='boton-registrar mb-4 mt-3'>Enviar</button>
											</form>)
											:
											(<form className="form-reportar-labels pt-3 pb-4" onSubmit={handleSubmitExt}>
												<div className='dropdown'>
													<label htmlFor="clave" className='label'>Clave:</label>
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
													<label htmlFor="fecha" className='label'>Fecha de reposición:</label>
													<input name="fecha" type="date" className='select-opciones' min={today} onChange={(event) => setFecha(event.target.value)}></input>
												</div>
												<div className='dropdown'>
													<label htmlFor="horario" className='label'>Horario:</label>
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
													<label htmlFor="salon" className='label'>Lugar:</label>
													<input name="salon" type="text" className='select-opciones' value={salon} onChange={(event) => setSalon(event.target.value)}></input>
												</div>
												<button type="submit" className='boton-registrar mb-4 mt-3'>Enviar</button>
											</form>)}

										</div>
									</div>
									<TablaReportarFaltasJustificadasProfesor data={data}></TablaReportarFaltasJustificadasProfesor>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReportarFaltasJustificadasProfesor;