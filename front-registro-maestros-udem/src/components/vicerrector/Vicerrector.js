/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoGraph } from "react-icons/go";
import TablaVicerrector from '../tablas/TablaVicerrector';
import GraficaClases from '../Graficas/GraficaAsistencia';
import { CSVLink } from 'react-csv';
import { FaFileDownload } from 'react-icons/fa';
import TablaInfoVicerrector from '../tablas/tablasInfo/vicerrector/TablaInfoVicerrector';
import GraficaLeyendas from '../Graficas/GraficaLeyendas';
import GraficaAsistenciaInformativo from '../Graficas/GraficaAsistenciaInformativo';
import GraficaLeyendasInformativo from '../Graficas/GraficaLeyendasInformativo';

const Vicerrector = () => {
	const [data, setData] = React.useState(null);
	const [total, setTotal] = React.useState(null);
	const [asistencia, setAsistencia] = React.useState(null);
	const [retraso, setRetraso] = React.useState(null);
	const [salidaPrevia, setSalidaPrevia] = React.useState(null);
	const [retrasoSalida, setRetrasoSalida] = React.useState(null);
	const [falta, setFalta] = React.useState(null);
	const [nombreReporte, setNombreReporte] = React.useState(null);
	const [schoolName, setSchoolName] = React.useState(null);
	const [totalInformativo, setTotalInformativo] = useState(null);
	const [aviso, setAviso] = useState(null);
	const [uniExt, setUniExt] = useState(null);
	const [reposicion, setReposicion] = useState(null);
	const [adelanto, setAdelanto] = useState(null);
	const [autorizacion, setAutorizacion] = useState(null);
	const [claseRepuesta, setClaseRepuesta] = useState(null);
	const navigate = useNavigate();

	// Get session storage information
	let user, idEscuela;

	// Get session storage information
	const session = JSON.parse(window.sessionStorage.getItem('session'));
	if (session) {
		user = session.nombre;
		idEscuela = session.idEscuela;
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
				case 5:
					navigate("/rector"); break;
				default: break;
			}
			fetch("http://192.168.3.6:5096/Reports/Vicerrector/GetSchoolAverage/" + idEscuela)
				.then(response => response.json())
				.then(json => {
					let totalCodes = 0;
					let totalCodesInformativo = 0;
					for (let i = 0; i < 11; i++) {
						let sum = 0;
						for (let j = 0; j < json.length; j++) {
							sum += json[j].codes[i];
							if (i < 5) {
								totalCodes += json[j].codes[i];
							} else {
								totalCodesInformativo += json[j].codes[i];
							}
							
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
						else if (i === 5) {
							setAviso(sum)
						}
						else if (i === 6) {
							setUniExt(sum)
						}
						else if (i === 7) {
							setReposicion(sum)
						}
						else if (i === 8) {
							setAdelanto(sum)
						}
						else if (i === 9) {
							setAutorizacion(sum)
						}
						else if (i === 10) {
							setClaseRepuesta(sum)
						}
					}
					setTotalInformativo(totalCodesInformativo)
					setNombreReporte(`Reporte ${json[0].schoolName}`)
					setData(json)
					setSchoolName(json[0].schoolName)
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
		data?.map((departamento) => (
			datos.push({departamento: departamento.departmentName, promedioAsistencia: `${departamento.average}%`
			, asistencia: departamento.codes[0], retraso: departamento.codes[1], salida: departamento.codes[2], retrasoSalida: departamento.codes[3], falta: departamento.codes[4]
			})
        ))

		return datos
	}

	const headers = [
		{ label: 'Departamento', key: 'departamento' },
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
        			<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white sidebar">
						<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
							<p className="d-flex align-items-center pb-5 mb-md-0 me-md-auto texto-udem text-decoration-none pt-4">
								<BiUserCircle className="icono-usuario"></BiUserCircle>
								<span className="p-nombre d-none d-sm-inline">{user}</span>
							</p>
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
								<li className="nav-item">
									<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/vicerrector") }}>
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
						<div className="container px-0 pt-3">
							<div className="row m-0 justify-content-center mt-3">
								<div className="col-12 text-center">
                                    <h1 className="mb-5 currentClass">Reporte de asistencia</h1>
									<div className="row m-0 grafica white-card">
									<GraficaClases 
											className="col-md-3" 
											asistencia={asistencia} 
											retraso={retraso} 
											salidaPrevia={salidaPrevia} 
											retrasoSalida={retrasoSalida} 
											falta={falta}>
										</GraficaClases>
										<GraficaLeyendas 
										className="col-md-3" 
											asistencia={asistencia} 
											retraso={retraso} 
											salidaPrevia={salidaPrevia} 
											retrasoSalida={retrasoSalida} 
											falta={falta} total={total}>
										</GraficaLeyendas>
										<GraficaAsistenciaInformativo 
											className="col-md-3" 
											aviso={aviso} 
											unidadExterna={uniExt} 
											reposicion={reposicion} 
											adelanto={adelanto} 
											autorizacion={autorizacion} 
											claseRepuesta={claseRepuesta}>
										</GraficaAsistenciaInformativo>
										<GraficaLeyendasInformativo 
										className="col-md-3" 
											aviso={aviso} 
											unidadExterna={uniExt} 
											reposicion={reposicion} 
											adelanto={adelanto} 
											autorizacion={autorizacion} 
											claseRepuesta={claseRepuesta}
											totalInformativo={totalInformativo}>
										</GraficaLeyendasInformativo>
									</div>
									<div className='row m-0 justify-content-end'>
										<CSVLink data={handleDatos()} headers={headers} filename={nombreReporte} className='text-decoration-none btn btn-outline-dark col-auto px-3 mb-3 align-items-center'>
											<span className='px-1 boton-descargar'>Descargar</span>
											<FaFileDownload className='mb-2 icono-descargar'></FaFileDownload>
										</CSVLink>
									</div>
									<TablaInfoVicerrector escuela={schoolName}></TablaInfoVicerrector>
									<div  className="mb-4" ></div>
									<TablaVicerrector data={data}></TablaVicerrector>
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

export default Vicerrector;