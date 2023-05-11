/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import TablaVerProfesores from '../tablas/TablaVerProfesores';
import SidebarAdministrador from '../sidebar/SidebarAdministrador';

const VerProfesoresAdministrador = () => {
	const [data, setData] = useState(null);
	const [buscador, setBuscador] = useState(null);
	const [busqueda, setBusqueda] = useState('');

	const navigate = useNavigate();

	let user;
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
			document.getElementById("spinner").style.display = "inline-block";
			fetch("http://192.168.3.6:5096/Information/Admin/GetClasses")
				.then(response => response.json())
				.then(json => {
					setData(json);
					document.getElementById("spinner").style.display = "none";
				})
				.catch(error => console.error(error));
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);

	const handleInputChange = (event) => {
		setBusqueda(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (busqueda === "") {
			setBuscador(null);
		} else {
			document.getElementById("spinner").style.display = "inline-block";
			fetch("http://192.168.3.6:5096/Information/Admin/SearchClass/" + busqueda)
				.then(response => response.json())
				.then(json => {
					setBuscador(json);
					document.getElementById("spinner").style.display = "none";
				})
				.catch(error => {
					const json = [{
						employeeName: "No hay información",
						nomina: "",
						subject_CVE: "",
						schedule: "",
						days: "",
						classroom: ""
					}]
					setBuscador(json);
					document.getElementById("spinner").style.display = "none";
				});
		}
	};

	return (
		<div>
			<div className="container-fluid">
				<div className="row flex-nowrap">
					<SidebarAdministrador user={user}></SidebarAdministrador>
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
										<h1 className="h1-falta mt-4">Buscador</h1>
										<form className="form-reportar" onSubmit={handleSubmit}>
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
									<div className="spinner-border mt-3" role="status" id="spinner">
										<span className="visually-hidden">Loading...</span>
									</div>
									{data && (
										<TablaVerProfesores
											headers={["Docente", "Nómina", "Clase", "Clave", "Horario", "Día", "Salón"]}
											data={buscador !== null ? buscador : data}
											from={"VerProfesoresAdministrador"}>
										</TablaVerProfesores>
									)}
									<div className="mb-5" ></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerProfesoresAdministrador;