/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import GraficaClases from '../../Graficas/GraficaClases';
import TablaClases from '../../tablas/TablaClases';
import { useLocation } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { FaFileDownload } from 'react-icons/fa';
import TablaInfoDirectorDepartamentoProfesorClase from '../../tablas/tablasInfo/directorDepartamento/TablaInfoDirectorDepartamentoProfesorClase';

const DirectorDepartamentoReporteProfesorClase = () => {
    const location = useLocation();
	const [infoClase, setInfoClase] = React.useState(null);
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
			// eslint-disable-next-line default-case
			switch (session.idRol) {
				case 1:
					navigate("/profesor/qr"); break;
				case 2:
					navigate("/administrador"); break;
				case 4:
					navigate("/vicerrector"); break;
				case 5:
					navigate("/rector"); break;
			}
			// Get current class that the professor is on
			fetch("http://172.32.137.116:5096/Reports/Professor/GetScheduleDetail/" + location.state.scheduleId)
				.then(response => response.json())
				.then(json => {
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

	function handleDatos() {
		let datos = [];
		infoClase?.map((clase) => (
			datos.push({clase: location.state.subjectName, clave: location.state.subject_CVE, fecha: clase.date.slice(0, -9), registro: clase.codeDescription})
        ))

		return datos
	}

	const headers = [
		{ label: 'Clase', key: 'clase' },
		{ label: 'Clave', key: 'clave' },
		{ label: 'Fecha', key: 'fecha' },
		{ label: 'Registro', key: 'registro' },
	  ];
	  let nombreReporte = `Reporte ${location.state.employeeName} - ${location.state.subjectName}`

	// --- COMPONENT (HTML) ---
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
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/director-departamento") }}>
										<i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline active-link"><GoGraph className="icono-sidebar"></GoGraph> Ver reportes</span>
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
						<div className="container px-0 pt-2">
							<div className="row m-0 justify-content-center mt-3">
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
									<div className='row m-0 justify-content-end'>
										<div className='btn btn-dark col-auto px-3 mb-3 align-items-center'>
											<CSVLink data={handleDatos()} headers={headers} filename={nombreReporte} className='text-decoration-none'>
												<span className='px-1 boton-descargar'>Descargar</span>
												<FaFileDownload className='mb-2 icono-descargar'></FaFileDownload>
											</CSVLink>
										</div>
									</div>
									<TablaInfoDirectorDepartamentoProfesorClase departamento={location.state.departamento} profesor={location.state.employeeName} clase={location.state.subjectName} clave={location.state.subject_CVE}></TablaInfoDirectorDepartamentoProfesorClase>
									<div  className="mb-4" ></div>
									<TablaClases dataClase={location.state} infoClase={infoClase}></TablaClases>
									<div  className="mb-5" ></div>
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

export default DirectorDepartamentoReporteProfesorClase;