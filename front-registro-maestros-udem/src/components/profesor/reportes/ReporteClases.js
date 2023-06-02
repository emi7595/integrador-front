/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { CSVLink } from 'react-csv';
// Components
import SidebarProfesor from '../sidebar/SidebarProfesor';
import GraficaClases from '../../Graficas/GraficaAsistencia';
import GraficaLeyendas from '../../Graficas/GraficaLeyendas';
import GraficaAsistenciaInformativo from '../../Graficas/GraficaAsistenciaInformativo';
import GraficaLeyendasInformativo from '../../Graficas/GraficaLeyendasInformativo';
import TablaInfoProfesorClase from '../../tablas/tablasInfo/profesor/TablaInfoProfesorClase';
import TablaClases from '../../tablas/TablaClases';

const ReporteClases = () => {
    const location = useLocation();
    const [infoClase, setInfoClase] = React.useState(null);
    const [total, setTotal] = React.useState(null);
    const [asistencia, setAsistencia] = React.useState(null);
    const [retraso, setRetraso] = React.useState(null);
    const [salidaPrevia, setSalidaPrevia] = React.useState(null);
    const [retrasoSalida, setRetrasoSalida] = React.useState(null);
    const [falta, setFalta] = React.useState(null);
    const [totalInformativo, setTotalInformativo] = useState(null);
    const [aviso, setAviso] = useState(null);
    const [uniExt, setUniExt] = useState(null);
    const [reposicion, setReposicion] = useState(null);
    const [adelanto, setAdelanto] = useState(null);
    const [autorizacion, setAutorizacion] = useState(null);
    const [claseRepuesta, setClaseRepuesta] = useState(null);

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
                    let sumaAsistencia = 0;
                    let sumaRetraso = 0;
                    let sumaSalidaPrevia = 0;
                    let sumaRetrasoSalida = 0;
                    let sumaFalta = 0;
                    let sumaAviso = 0;
                    let sumaUniExt = 0;
                    let sumaReposicion = 0;
                    let sumaAdelanto = 0;
                    let sumaAutorizacion = 0;
                    let sumaClaseRepuesta = 0;
                    let totalCodes = 0;
                    let totalCodesInformativo = 0;
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
                        else if (codigoActual === 5) {
                            sumaAviso += 1;
                            totalCodesInformativo += 1;
                        }
                        else if (codigoActual === 6) {
                            sumaUniExt += 1;
                            totalCodesInformativo += 1;
                        }
                        else if (codigoActual === 7) {
                            sumaReposicion += 1;
                            totalCodesInformativo += 1;
                        }
                        else if (codigoActual === 8) {
                            sumaAdelanto += 1;
                            totalCodesInformativo += 1;
                        }
                        else if (codigoActual === 9) {
                            sumaAutorizacion += 1;
                            totalCodesInformativo += 1;
                        }
                        else if (codigoActual === 10) {
                            sumaClaseRepuesta += 1;
                            totalCodesInformativo += 1;
                        }
                    }
                    setAsistencia(sumaAsistencia);
                    setRetraso(sumaRetraso);
                    setSalidaPrevia(sumaSalidaPrevia);
                    setRetrasoSalida(sumaRetrasoSalida);
                    setFalta(sumaFalta);
                    setAviso(sumaAviso);
                    setUniExt(sumaUniExt);
                    setReposicion(sumaReposicion);
                    setAdelanto(sumaAdelanto);
                    setAutorizacion(sumaAutorizacion);
                    setClaseRepuesta(sumaClaseRepuesta);
                    setInfoClase(json);
                    setTotal(totalCodes);
                    setTotalInformativo(totalCodesInformativo);
                })
                .catch(error => console.error(error));
        }
        // If user is not logged in, redirect to login
        else {
            navigate("/");
        }
    }, []);

    // --- FUNCTION THAT HANDLES DATA TO EXPORT INTO CSV ---
    function handleDatos() {
        let datos = [];
        infoClase?.map((clase) => (
            datos.push({ 
                clase: location.state.subjectName, 
                clave: location.state.subject_CVE, 
                fecha: clase.date.slice(0, -9), 
                registro: clase.codeDescription
            })
        ));

        return datos;
    }

    // Headers for CSV
    const headers = [
        { label: 'Clase', key: 'clase' },
        { label: 'Clave', key: 'clave' },
        { label: 'Fecha', key: 'fecha' },
        { label: 'Registro', key: 'registro' },
    ];
    let nombreReporte = `Reporte ${user} - ${location.state.subjectName}`;

    // Date
    const today = new Date();
	const day = String(today.getDate()).padStart(2, '0');
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const year = today.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;


    // --- COMPONENT (HTML) ---
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <SidebarProfesor user={user}></SidebarProfesor>
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
                                    <h1 className="mb-2 currentClass">Reporte de asistencia de clase</h1>
                                    <h6 className="mb-5">Corte al día: {formattedDate}</h6>
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
                                    <TablaInfoProfesorClase dataClase={location.state}></TablaInfoProfesorClase>
                                    <div className="mb-4" ></div>
                                    <TablaClases dataClase={location.state} infoClase={infoClase}></TablaClases>
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

export default ReporteClases;