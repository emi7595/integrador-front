/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GraficaClases from '../../Graficas/GraficaAsistencia';
import { CSVLink } from 'react-csv';
import { FaFileDownload } from 'react-icons/fa';
import SidebarRector from '../sidebar/SidebarRector';
import GraficaLeyendas from '../../Graficas/GraficaLeyendas';
import TablaRectorAsistencia from '../tablas/TablaRectorAsistencia';

const ReporteRector = () => {
	const [data, setData] = React.useState(null);
	const [total, setTotal] = React.useState(null);
	const [asistencia, setAsistencia] = React.useState(null);
	const [retraso, setRetraso] = React.useState(null);
	const [salidaPrevia, setSalidaPrevia] = React.useState(null);
	const [retrasoSalida, setRetrasoSalida] = React.useState(null);
	const [falta, setFalta] = React.useState(null);
	const navigate = useNavigate();

	// Get session storage information
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
			fetch("http://192.168.29.1:5096/Reports/Rector/GetUDEMAverage/")
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
		data?.map((escuela) => (
			datos.push({escuela: escuela.schoolName, promedioAsistencia: `${escuela.average}%`
			, asistencia: escuela.codes[0], retraso: escuela.codes[1], salida: escuela.codes[2], retrasoSalida: escuela.codes[3], falta: escuela.codes[4]
			})
        ))

		return datos
	}

	const headers = [
		{ label: 'Escuela', key: 'escuela' },
		{ label: 'PromedioAsistencia', key: 'promedioAsistencia' },
		{ label: 'Asistencia', key: 'asistencia' },
		{ label: 'Retraso Inicial', key: 'retraso' },
		{ label: 'Salida Previa', key: 'salida' },
		{ label: 'Retraso y Salida', key: 'retrasoSalida' },
		{ label: 'Falta', key: 'falta' },
	];

	// --- COMPONENT (HTML) ---
	return (
		<div>
			{/* <SideBar usuario = {user}></SideBar> */}
			<div className="container-fluid">
    			<div className="row flex-nowrap">
					<SidebarRector user={user}></SidebarRector>
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
											falta={falta} total={total}>
										</GraficaLeyendas>
									</div>
									<div className='row m-0 justify-content-end'>
										<CSVLink 
											data={handleDatos()} 
											headers={headers} 
											filename={"Reporte Rector"} 
											className='text-decoration-none btn btn-outline-dark col-auto px-3 mb-3 align-items-center'>
											<span className='px-1 boton-descargar'>Descargar</span>
											<FaFileDownload className='mb-2 icono-descargar'></FaFileDownload>
										</CSVLink>
									</div>
									<TablaRectorAsistencia
										headers={["Escuela", "Promedio Asistencia", "Detalle"]} 
										data={data} 
										from={"ReporteRector"}>
									</TablaRectorAsistencia>
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

export default ReporteRector;