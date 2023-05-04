/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import GraficaClases from '../../Graficas/GraficaAsistencia';
import { useLocation } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { FaFileDownload } from 'react-icons/fa';
import TablaInfoVicerrectorDepartamentoProfesorClase from '../../tablas/tablasInfo/vicerrector/TablaInfoVicerrectorDepartamentoProfesorClase';
import SidebarAdministrador from '../sidebar/SidebarAdministrador';
import GraficaLeyendas from '../../Graficas/GraficaLeyendas';
import TablaAsistencia from '../tablas/TablaAsistencia';

const ReporteAdministradorClase = () => {
    const location = useLocation();
	const [infoClase, setInfoClase] = useState(null);
	const [total, setTotal] = useState(null);
	const [asistencia, setAsistencia] = useState(null);
	const [retraso, setRetraso] = useState(null);
	const [salidaPrevia, setSalidaPrevia] = useState(null);
	const [retrasoSalida, setRetrasoSalida] = useState(null);
	const [falta, setFalta] = useState(null);

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
			// eslint-disable-next-line default-case
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
			fetch("http://192.168.29.1:5096/Reports/Professor/GetScheduleDetail/" + location.state.scheduleId)
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
			datos.push({
				clase: location.state.subjectName, 
				clave: location.state.subject_CVE, 
				fecha: clase.date.slice(0, -9), 
				registro: clase.codeDescription})
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
									<TablaInfoVicerrectorDepartamentoProfesorClase 
										escuela={location.state.escuela} 
										departamento={location.state.departamento} 
										profesor={location.state.employeeName} 
										clase={location.state.subjectName} 
										clave={location.state.subject_CVE}>
									</TablaInfoVicerrectorDepartamentoProfesorClase>
									<div  className="mb-4" ></div>
                                    
									<TablaAsistencia 
										headers={["Fecha", "Registro"]}  
										dataClase={location.state} 
										infoClase={infoClase}
										from={"ReporteAdministradorClase"}>
									</TablaAsistencia>
									<div  className="mb-5" ></div>
								</div>
							</div>
						</div>
					</div>
    			</div>
			</div>
		</div>
	);
};

export default ReporteAdministradorClase;