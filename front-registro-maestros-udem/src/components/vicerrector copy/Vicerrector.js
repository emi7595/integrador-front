/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';
import { FaFileDownload } from 'react-icons/fa';
// Components
import SidebarVicerrector from './sidebar/SidebarVicerrector';
import GraficaClases from '../Graficas/GraficaAsistencia';
import GraficaLeyendas from '../Graficas/GraficaLeyendas';
import GraficaAsistenciaInformativo from '../Graficas/GraficaAsistenciaInformativo';
import GraficaLeyendasInformativo from '../Graficas/GraficaLeyendasInformativo';
import TablaInfoVicerrector from '../tablas/tablasInfo/vicerrector/TablaInfoVicerrectorEscuela';
import TablaVicerrector from '../tablas/TablaVicerrector';

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
                case 4:
                    navigate("/vicerrector"); break;
                case 5:
                    navigate("/rector"); break;
                default: break;
            }
            fetch("http://192.168.29.1:5096/Reports/Decano/GetSchoolAverage/" + idEscuela)
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
                        switch (i) {
                            case 0: setAsistencia(sum); break;
                            case 1: setRetraso(sum); break;
                            case 2: setSalidaPrevia(sum); break;
                            case 3: setRetrasoSalida(sum); break;
                            case 4: setFalta(sum); break;
                            case 5: setAviso(sum); break;
                            case 6: setUniExt(sum); break;
                            case 7: setReposicion(sum); break;
                            case 8: setAdelanto(sum); break;
                            case 9: setAutorizacion(sum); break;
                            case 10: setClaseRepuesta(sum); break;
                            default: break;
                        }

                    }
                    setTotalInformativo(totalCodesInformativo);
                    setNombreReporte(`Reporte ${json[0].schoolName}`);
                    setData(json);
                    setSchoolName(json[0].schoolName);
                    setTotal(totalCodes);
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
        data?.map((departamento) => (
            datos.push({
                departamento: departamento.departmentName,
                promedioAsistencia: `${departamento.average}%`,
                asistencia: departamento.codes[0],
                retraso: departamento.codes[1],
                salida: departamento.codes[2],
                retrasoSalida: departamento.codes[3],
                falta: departamento.codes[4],
                aviso: departamento.codes[5],
                unidadExterna: departamento.codes[6],
                reposicionProgramada: departamento.codes[7],
                adelanto: departamento.codes[8],
                autorizacion: departamento.codes[9],
                claseRepuesta: departamento.codes[10]
            })
        ));

        return datos;
    }

    // Headers for CSV
    const headers = [
        { label: 'Departamento', key: 'departamento' },
        { label: 'PromedioAsistencia', key: 'promedioAsistencia' },
        { label: 'Asistencia', key: 'asistencia' },
        { label: 'Retraso Inicial', key: 'retraso' },
        { label: 'Salida Previa', key: 'salida' },
        { label: 'Retraso y Salida', key: 'retrasoSalida' },
        { label: 'Falta', key: 'falta' },
        { label: 'Aviso', key: 'aviso' },
        { label: 'Unidad Externa', key: 'unidadExterna' },
        { label: 'Reposición Programada', key: 'reposicionProgramada' },
        { label: 'Adelanto', key: 'adelanto' },
        { label: 'Autorización', key: 'autorizacion' },
        { label: 'Clase Repuesta', key: 'claseRepuesta' }
    ];

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
                    <SidebarVicerrector user={user}></SidebarVicerrector>
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
                                    <h1 className="mb-2 currentClass">Reporte de asistencia de escuela</h1>
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
                                    <TablaInfoVicerrector escuela={schoolName}></TablaInfoVicerrector>
                                    <div className="mb-4" ></div>
                                    <TablaVicerrector data={data}></TablaVicerrector>
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

export default Vicerrector;