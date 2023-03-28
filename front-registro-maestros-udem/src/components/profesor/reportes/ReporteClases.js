import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoReport, GoGraph } from "react-icons/go";
import GraficaClases from '../../Graficas/GraficaClases';
import TablaProfesor from '../../tablas/TablaProfesor';
import TablaClases from '../../tablas/TablaClases';
import { useLocation } from 'react-router-dom';

const ReporteClases = () => {
    const location = useLocation();
	const [infoClase, setInfoClase] = React.useState(null);
	const [total, setTotal] = React.useState(null);
	const [asistencia, setAsistencia] = React.useState(null);
	const [retraso, setRetraso] = React.useState(null);
	const [salidaPrevia, setSalidaPrevia] = React.useState(null);
	const [retrasoSalida, setRetrasoSalida] = React.useState(null);
	const [falta, setFalta] = React.useState(null);


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
			fetch("http://192.168.29.1:5096/Reports/Professor/GetScheduleDetail/" + location.state.scheduleId)
				.then(response => response.json())
				.then(json => {
					// let totalCodes = 0;
					// for (let i = 0; i < 5; i++) {
					// 	let sum = 0;
					// 	for (let j = 0; j < json.length; j++) {
					// 		sum += json[j].codes[i];
					// 		totalCodes += json[j].codes[i];
					// 	}
					// 	if (i === 0) {
					// 		setAsistencia(sum)
					// 	}
					// 	else if (i === 1) {
					// 		setRetraso(sum)
					// 	}
					// 	else if (i === 2) {
					// 		setSalidaPrevia(sum)
					// 	}
					// 	else if (i === 3) {
					// 		setRetrasoSalida(sum)
					// 	}
					// 	else if (i === 4) {
					// 		setFalta(sum)
					// 	}
					// }
                    let sumaAsistencia = 0;
                    let sumaRetraso = 0;
                    let sumaSalidaPrevia = 0;
                    let sumaRetrasoSalida = 0;
                    let sumaFalta = 0;
                    let totalCodes = 0;
                    for (let i = 0; i < json.length; i++) {
                        const codigoActual = parseInt(json[i].codeId);
                        if (codigoActual === 0) {
                            sumaAsistencia += 1;
                            totalCodes += 1;
                        }
                        else if (codigoActual === 1) {
                            sumaRetraso += 1;
                            totalCodes += 1;
                        }
                        else if (codigoActual === 2) {
                            sumaSalidaPrevia += 1;
                            totalCodes += 1;
                        }
                        else if (codigoActual === 3) {
                            sumaRetrasoSalida += 1;
                            totalCodes += 1;
                        }
                        else if (codigoActual === 4) {
                            sumaFalta += 1;
                            totalCodes += 1;
                        }
                        
                      }
                        setAsistencia(sumaAsistencia)
                        setRetraso(sumaRetraso)
                        setSalidaPrevia(sumaSalidaPrevia)
                        setRetrasoSalida(sumaRetrasoSalida)
                        setFalta(sumaFalta)


					setInfoClase(json)
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
							<a href="#" className="d-flex align-items-center pb-5 mb-md-0 me-md-auto text-black text-decoration-none pt-4">
								<BiUserCircle className="icono-usuario"></BiUserCircle>
								<span className="p-nombre d-none d-sm-inline">{user}</span>
							</a>
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
								<li className="nav-item">
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/profesor/qr") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><BsQrCode className="icono-sidebar"></BsQrCode> Registrar asistencia</span>
									</a>
								</li>
								<li className="nav-item">
									<a href="#" className="nav-link align-middle px-0 pb-4 fs-5">
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><FaChalkboardTeacher className="icono-sidebar"></FaChalkboardTeacher> Ver mis clases</span>
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/profesor/reporte") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><GoGraph className="icono-sidebar"></GoGraph> Ver reportes</span>
									</a>
								</li>
								<li className="nav-item">
									<a href="#" className="nav-link align-middle px-0 fs-5">
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline"><GoReport className="icono-sidebar"></GoReport> Reportar faltas justificadas</span>
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
									<TablaClases dataClase={location.state} infoClase={infoClase}></TablaClases>
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

export default ReporteClases;