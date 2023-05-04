/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SidebarAdministrador from '../sidebar/SidebarAdministrador';
import TablaFaltasJustificadasAceptadas from '../tablas/TablaFaltasJustificadasAceptadas';

const FaltasJustificadasAceptadasAdministrador = () => {
	const [data, setData] = useState(null);

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
			fetch("http://172.32.138.118:5096/Repositions/Admin/GetAcceptedReposition")
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
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);

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
									<h1 className="mb-5 currentClass">Faltas Justificadas Aceptadas</h1>
									{data && (
										<TablaFaltasJustificadasAceptadas
											headers={["Profesor", "Nómina", "Clase", "Clave", "Horario", "Salón", "Num. Evento"]}
											data={data}
											from={"VerProfesoresAdministrador"}>
										</TablaFaltasJustificadasAceptadas>
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

export default FaltasJustificadasAceptadasAdministrador;