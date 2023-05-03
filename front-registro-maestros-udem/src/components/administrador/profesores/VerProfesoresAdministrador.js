/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BiUserCircle } from "react-icons/bi";
import { BsQrCode} from "react-icons/bs";
import { FaChalkboardTeacher, FaFileDownload } from "react-icons/fa";
import { GoReport, GoGraph } from "react-icons/go";
import GraficaClases from '../../Graficas/GraficaAsistencia';
import { CSVLink } from "react-csv";
import TablaAsistencia from '../tablas/TablaAsistencia';
import TablaReportarFaltasJustificadasProfesor from '../../tablas/tablasFaltasJustificadas/profesor/TablaReportarFaltasJustificadasProfesor';
import TablaVerProfesores from '../tablas/TablaVerProfesores';
import SidebarAdministrador from '../sidebar/SidebarAdministrador';

const VerProfesoresAdministrador = () => {
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
			fetch("http://192.168.3.6:5096/Information/Admin/GetClasses")
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
			fetch("http://192.168.3.6:5096/Information/Admin/SearchClass/" + busqueda)
				.then(response => response.json())
				.then(json => {
					setBuscador(json)
				})
                .catch(error =>{
					const json = [{
						employeeName: "No hay información",
						nomina: "",
						subject_CVE: "",
						schedule: "",
						days: "",
						classroom: ""
					}]
					setBuscador(json);
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
									<div className="row m-0 black-card mb-2">
										<h1 className="h1-falta mt-4">Buscar Profesor</h1>
										<form className="form-reportar" onSubmit={handleSubmit}>
											{/* <div className="form-reportar-labels pt-5 pb-5">
											</div> */}
											<input
												className="form-buscar-profesor"
												placeholder='Nombre, Clave, Materia, Nómina, Salón...'
												type="text"
												value={busqueda}
												onChange={handleInputChange}
											/>
											<button type="submit" className="boton-registrar mb-4">Buscar</button>
										</form>
									</div>
									{ /* CONTAINERS FOR QR CODE */ }
									{data && ( 
									<TablaVerProfesores
                                        headers={["Profesor", "Nómina", "Clase", "Clave", "Horario", "Día", "Salón"]} 
                                        data={buscador !== null ? buscador : data}
                                        from={"VerProfesoresAdministrador"}>
                                    </TablaVerProfesores>
									)}
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

export default VerProfesoresAdministrador;