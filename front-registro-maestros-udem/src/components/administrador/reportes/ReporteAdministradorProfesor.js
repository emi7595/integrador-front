/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import GraficaClases from '../../Graficas/GraficaAsistencia';
import { CSVLink } from 'react-csv';
import { FaFileDownload } from 'react-icons/fa';
import TablaInfoRectorEscuelaDepartamentoProfesor from '../../tablas/tablasInfo/rector/TablaInfoRectorEscuelaDepartamentoProfesor';
import GraficaLeyendas from '../../Graficas/GraficaLeyendas';
import SidebarAdministrador from '../sidebar/SidebarAdministrador';
import TablaAsistencia from '../tablas/TablaAsistencia';


const ReporteAdministradorProfesor = () => {
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
				case 3:
					navigate("/director-departamento"); break;
				case 4:
					navigate("/vicerrector"); break;
				case 5:
					navigate("/rector"); break;
				default: break;
			}
			// Get current class that the professor is on
			fetch("http://192.168.3.6:5096/Reports/Professor/GetAttendanceAverage/" + location.state.nomina)
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

	function handleDatos() {
		let datos = [];
		data?.map((clase) => (
			datos.push({
                clase: clase.subjectName, 
                clave: clase.subject_CVE, 
                promedioAsistencia: `${clase.average}%`,
				asistencia: clase.codes[0], 
                retraso: clase.codes[1], 
                salida: clase.codes[2], 
                retrasoSalida: clase.codes[3], 
                falta: clase.codes[4]})
        ))

		return datos
	}

	  const headers = [
		{ label: 'Clase', key: 'clase' },
		{ label: 'Clave', key: 'clave' },
		{ label: 'PromedioAsistencia', key: 'promedioAsistencia' },
		{ label: 'Asistencia', key: 'asistencia' },
		{ label: 'Retraso Inicial', key: 'retraso' },
		{ label: 'Salida Previa', key: 'salida' },
		{ label: 'Retraso y Salida', key: 'retrasoSalida' },
		{ label: 'Falta', key: 'falta' },
	  ];

	let nombreReporte = `Reporte ${location.state.departmentName} - ${location.state.employeeName}`


	// --- COMPONENT (HTML) ---
	return (
		<div>
			{/* <SideBar usuario = {user}></SideBar> */}
			<div className="container-fluid">
    			<div className="row flex-nowrap">
                    <SidebarAdministrador user={user}></SidebarAdministrador>
					{ /* CONTAINERS FOR NOT SIDEBAR */ }
					<div className='col-10'>
						<div className="container-fluid px-0 header mt-2 pt-4">
							<div className="row m-0 justify-content-end align-items-center">
								<div className="col-auto px-0 m-3 d-flex flex-row justify-content-center align-items-center">
									<p className="d-flex justify-content-center align-items-center m-0 pr-2 p-salir">Salir</p>
									&nbsp;&nbsp;<a 
                                        href="#" 
                                        onClick={() => { window.sessionStorage.clear(); navigate("/") }} 
                                        className="anchor">
										    <FontAwesomeIcon icon={faArrowRightFromBracket} className="icono-salir"/>
									</a>&nbsp;&nbsp;
								</div>
							</div>
						</div>
						<div className="container px-0 pt-2">
							<div className="row m-0 justify-content-center mt-3">
								<div className="col-12 text-center">
                                    <h1 className="mb-5 currentClass">Reporte de asistencia</h1>
									<div className="row m-0 grafica white-card">
										<GraficaClases 
                                            className="col-md-6" 
                                            asistencia={asistencia} 
                                            retraso={retraso} 
                                            salidaPrevia={salidaPrevia} 
                                            retrasoSalida={retrasoSalida} 
                                            falta={falta}>
                                        </GraficaClases>
										<GraficaLeyendas 
                                            asistencia={asistencia} 
                                            retraso={retraso} 
                                            salidaPrevia={salidaPrevia} 
                                            retrasoSalida={retrasoSalida} 
                                            falta={falta} 
                                            total={total}>
                                        </GraficaLeyendas>
									</div>
									<div className='row m-0 justify-content-end'>
										<CSVLink 
                                            data={handleDatos()} 
                                            headers={headers} 
                                            filename={nombreReporte} 
                                            className='text-decoration-none btn btn-outline-dark col-auto px-3 mb-3 align-items-center'>
											    <span className='px-1 boton-descargar'>Descargar</span>
											    <FaFileDownload className='mb-2 icono-descargar'></FaFileDownload>
										</CSVLink>
									</div>
									<TablaInfoRectorEscuelaDepartamentoProfesor 
                                        escuela={location.state.escuela} 
                                        departamento={location.state.departamento} 
                                        profesor={location.state.employeeName}>
                                    </TablaInfoRectorEscuelaDepartamentoProfesor>
									<div  className="mb-4" ></div>
									<TablaAsistencia 
                                        headers={["Clase", "Clave", "Promedio Asistencia", "Detalle"]} 
                                        data={data} escuela={location.state.escuela} 
                                        departamento={location.state.departamento} 
                                        profesor={location.state.employeeName} 
                                        from={"ReporteAdministradorProfesor"}>
                                    </TablaAsistencia>
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

export default ReporteAdministradorProfesor;