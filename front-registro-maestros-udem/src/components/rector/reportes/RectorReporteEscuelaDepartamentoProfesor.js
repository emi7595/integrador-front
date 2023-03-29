/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import GraficaClases from '../../Graficas/GraficaClases';
import TablaRectorEscuelaDepartamentoProfesor from '../../tablas/TablaRectorEscuelaDepartamentoProfesor';


const RectorReporteEscuelaDepartamentoProfesor = () => {
    const location = useLocation();
	const [data, setData] = React.useState(null);
	const [total, setTotal] = React.useState(null);
	const [asistencia, setAsistencia] = React.useState(null);
	const [retraso, setRetraso] = React.useState(null);
	const [salidaPrevia, setSalidaPrevia] = React.useState(null);
	const [retrasoSalida, setRetrasoSalida] = React.useState(null);
	const [falta, setFalta] = React.useState(null);


	const navigate = useNavigate();
	let user;

	// Get session storage information
	const session = JSON.parse(window.sessionStorage.getItem('session'));
	if (session) {
		user = session.nombre;
	}

	useEffect(() => {
		// If user is logged in...
		if (session) {
			// Redirect to proper role if necessary
			switch (session.idRol) {
				case 1:
					navigate("/profesor/qr"); break;
				case 2:
					navigate("/administrador"); break;
				case 3:
					navigate("/director-departamento"); break;
				case 4:
					navigate("/vicerrector"); break;
				default: break;
			}
			// Get current class that the professor is on
			fetch("http://192.168.29.1:5096/Reports/Professor/GetAttendanceAverage/" + location.state.nomina)
				.then(response => response.json())
				.then(json => {
					let totalCodes = 0;
					for (let i = 0; i < 5; i++) {
						let sum = 0;
						for (let j = 0; j < json.length; j++) {
							sum += json[j].codes[i];
							totalCodes += json[j].codes[i];
						}
						if (i === 0) {
							setAsistencia(sum)
						}
						else if (i === 1) {
							setRetraso(sum)
						}
						else if (i === 2) {
							setSalidaPrevia(sum)
						}
						else if (i === 3) {
							setRetrasoSalida(sum)
						}
						else if (i === 4) {
							setFalta(sum)
						}
					}
					setData(json)
					setTotal(totalCodes)
				})
                .catch(error => console.error(error));
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);


	// --- COMPONENT (HTML) ---
	return (
		<div>
			{/* <SideBar usuario = {user}></SideBar> */}
			<div className="container-fluid">
    			<div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white sidebar">
						<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
							<a href="#" className="d-flex align-items-center pb-5 mb-md-0 me-md-auto texto-udem text-decoration-none pt-4">
								<BiUserCircle className="icono-usuario"></BiUserCircle>
								<span className="p-nombre d-none d-sm-inline">{user}</span>
							</a>
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
								<li className="nav-item">
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/rector") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><GoGraph className="icono-sidebar"></GoGraph> Ver reportes</span>
									</a>
								</li>
							</ul>
							<hr/>
						</div>
        			</div>
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
						<div className="container px-0 pt-5">
							<div className="row m-0 justify-content-center mt-5">
								<div className="col-12 text-center">
                                    <h1 className="mb-5 currentClass">Reporte de asistencia</h1>
									<div className="row grafica">
										<GraficaClases className="col-md-6" asistencia={asistencia} retraso={retraso} salidaPrevia={salidaPrevia} retrasoSalida={retrasoSalida} falta={falta}></GraficaClases>
										<div className='col-md-6 leyenda'>
											<div>
												<p className="leyenda"><span className="asistencia"></span> Asistencia: {asistencia}/{total}</p>
												<p className="leyenda"><span className="retraso"></span> Retraso Inicial: {retraso}/{total}</p>
												<p className="leyenda"><span className="salida"></span> Salida Previa: {salidaPrevia}/{total}</p>
												<p className="leyenda"><span className="retraso-salida"></span> Retraso y Salida: {retrasoSalida}/{total}</p>
												<p className="leyenda"><span className="falta"></span> Falta: {falta}/{total}</p>
											</div>
										</div>
									</div>
									{ /* CONTAINERS FOR QR CODE */ }
									<TablaRectorEscuelaDepartamentoProfesor data={data}></TablaRectorEscuelaDepartamentoProfesor>
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

export default RectorReporteEscuelaDepartamentoProfesor;