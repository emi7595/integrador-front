/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { BsCheck2Square, BsQrCode} from "react-icons/bs";
import { FaChalkboardTeacher, FaFileDownload } from "react-icons/fa";
import { GoReport, GoGraph } from "react-icons/go";
import GraficaClases from '../../Graficas/GraficaAsistencia';
import { CSVLink } from "react-csv";
import TablaAsistencia from '../tablas/TablaAsistencia';
import TablaReportarFaltasJustificadasProfesor from '../../tablas/tablasFaltasJustificadas/profesor/TablaReportarFaltasJustificadasProfesor';
import TablaVerProfesores from '../tablas/TablaVerProfesores';
import SidebarAdministrador from '../sidebar/SidebarAdministrador';

const FaltasJustificadasAdministrador = () => {
	const [data, setData] = React.useState(null);
	const [buscador, setBuscador] = React.useState(null);


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
			fetch("http://192.168.29.1:5096/Information/Admin/GetClasses")
				.then(response => response.json())
				.then(json => {
					setData(json)
				})
                .catch(error => console.error(error));
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);

	  const [busqueda, setBusqueda] = useState('');

	  const handleInputChange = (event) => {
		setBusqueda(event.target.value);
	  };
	
	  const handleSubmit = (event) => {
		event.preventDefault();
		if (busqueda === "") {
			setBuscador(null);
		} else {
			fetch("http://192.168.29.1:5096/Information/Admin/SearchClass/" + busqueda)
				.then(response => response.json())
				.then(json => {
					setBuscador(json)
				})
                .catch(error =>{
					console.error(error)
					const json = [{
						employeeName: "No hay información",
						nomina: "",
						subject_CVE: "",
						schedule: "",
						days: "",
						classroom: ""
					}]
					setBuscador(json);
					console.log(json);
				});
		}
		// Llamar a la API con la búsqueda
		
	  };

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
									&nbsp;&nbsp;<a href="#" onClick={() => { window.sessionStorage.clear(); navigate("/") }} className="anchor">
										<FontAwesomeIcon icon={faArrowRightFromBracket} className="icono-salir"/>
									</a>&nbsp;&nbsp;
								</div>
							</div>
						</div>
						<div className="container px-0 pt-3">
							<div className="row m-0 justify-content-center mt-3">
								<div className="col-12 text-center">
                                    <h1 className="mb-5 currentClass">Administrar Faltas Justificadas</h1>
									{ /* CONTAINERS FOR QR CODE */ }
                                    <div className="row justify-content-center my-3 px-3 pb-2">
										<div className="col-12 col-md-6">
											<div className="row justify-content-center mb-3">
												<div className="col-6">
													<button className="btn-block btn-color boton-qr w-100" onClick={() => navigate("/administrador/faltas-justificadas/aceptadas")}>Raltas Aceptadas</button>
												</div>
												<div className="col-6">
													<button className="btn-block btn-color boton-qr w-100" onClick={() => navigate("/administrador/faltas-justificadas/pendientes")}>Faltas Pendientes</button>
												</div>
											</div>
										</div>
									</div>
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

export default FaltasJustificadasAdministrador;