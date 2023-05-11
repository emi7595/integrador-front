/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";
import GraficaClases from '../../Graficas/GraficaAsistencia';
import TablaDepartamentoProfesorClase from '../../tablas/TablaDepartamentoProfesorClase';
import { CSVLink } from 'react-csv';
import TablaInfoDirectorDepartamentoProfesor from '../../tablas/tablasInfo/directorDepartamento/TablaInfoDirectorDepartamentoProfesor';
import GraficaAsistenciaInformativo from '../../Graficas/GraficaAsistenciaInformativo';
import GraficaLeyendas from '../../Graficas/GraficaLeyendas';
import GraficaLeyendasInformativo from '../../Graficas/GraficaLeyendasInformativo';
import SidebarDirector from '../sidebar/SidebarDirector';


const DirectorDepartamentoReporteProfesor = () => {
    const location = useLocation();
    const [data, setData] = React.useState(null);
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
            fetch("http://192.168.3.6:5096/Reports/Professor/GetAttendanceAverage/" + location.state.nomina)
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
                clase: clase.subjectName, clave: clase.subject_CVE, promedioAsistencia: `${clase.average}%`,
                asistencia: clase.codes[0], retraso: clase.codes[1], salida: clase.codes[2], retrasoSalida: clase.codes[3], falta: clase.codes[4]
            })
        ));

        return datos;
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

    let nombreReporte = `Reporte ${location.state.departmentName} - ${location.state.employeeName}`;

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
                    <SidebarDirector user={user}></SidebarDirector>
                    { /* CONTAINERS FOR NOT SIDEBAR */}
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
                        <div className="container px-0 pt-2">
                            <div className="row m-0 justify-content-center mt-3">
                                <div className="col-12 text-center">
                                    <h1 className="mb-2 currentClass">Reporte de asistencia de docente</h1>
                                    <h6 className="mb-5">Corte al día: {formattedDate}</h6>
                                    <div className="row m-0 grafica white-card white-card">
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
                                    <TablaInfoDirectorDepartamentoProfesor departamento={location.state.departamento} profesor={location.state.employeeName}></TablaInfoDirectorDepartamentoProfesor>
                                    <div className="mb-4" ></div>
                                    <TablaDepartamentoProfesorClase data={data} departamento={location.state.departamento} profesor={location.state.employeeName}></TablaDepartamentoProfesorClase>
                                    <div className="mb-5" ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { /* END FOR NOT SIDEBAR */}
                </div>
            </div>
        </div>
    );
};

export default DirectorDepartamentoReporteProfesor;