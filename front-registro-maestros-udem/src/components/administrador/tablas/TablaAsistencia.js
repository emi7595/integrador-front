/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { BsPencilSquare } from 'react-icons/bs';
import { Modal } from 'bootstrap';

const TablaAsistencia = (props) => {
    const { headers, data, actualizarData, from } = props;
    const navigate = useNavigate();
    const [attendance, setAttendance] = useState("0");

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#333333',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function editAttendance(idCode, idSchedule, date) {
        document.getElementById("attendance").value = idCode;
        const myModal = new Modal(document.getElementById('editModal'));
        myModal.show();
        const enviarBtn = document.getElementById("sendButton");
        enviarBtn.addEventListener("click", () => enviarBtnClickHandler(idSchedule, date, myModal));
    }

    function enviarBtnClickHandler(idSchedule, date, myModal) {
        let attendance = document.getElementById("attendance").value;
        const enviarBtn = document.getElementById("sendButton");
        enviarBtn.removeEventListener("click", enviarBtnClickHandler);
        sendValues(attendance, idSchedule, date, myModal);
    }

    const sendValues = async (attendance, idSchedule, date, myModal) => {
        try {
            myModal.hide();
            var jsonData = { "idSchedule": idSchedule, "date": date, "codeId": attendance }
            const response = await fetch("http://192.168.3.6:5096/Attendance/EditAttendance", {
                method: 'PUT',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });
            if (!response.ok) {
                throw new Error("Algo salió mal.");
            }
            else {
                //window.location.reload();
                fetch("http://192.168.3.6:5096/Reports/Professor/GetScheduleDetail/" + idSchedule)
                    .then(async (response) => response.json())
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
                        return actualizarData(sumaAsistencia, sumaRetraso, sumaSalidaPrevia, sumaRetrasoSalida, sumaFalta, sumaAviso, sumaUniExt, sumaReposicion, sumaAdelanto, sumaAutorizacion, sumaClaseRepuesta, json, totalCodes, totalCodesInformativo);
                    })
                    .catch(error => console.error(error));
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {headers?.map((header, index) => header === "Registro" ? <StyledTableCell key={header} align="center">{header}</StyledTableCell> : index === 0 ? <StyledTableCell key={header}>{header}</StyledTableCell> : index === headers.length - 1 ? <StyledTableCell key={header} align="right">{header}</StyledTableCell> : <StyledTableCell key={header} align="left">{header}</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            from === "ReporteAdministrador" ?
                                data?.map((escuela) => (
                                    <StyledTableRow key={escuela.schoolId}>
                                        <StyledTableCell component="th" scope="row">{escuela.schoolName}</StyledTableCell>
                                        <StyledTableCell align="left">{escuela.average === -1 ? "N/A" : `${escuela.average}%`}</StyledTableCell>
                                        <StyledTableCell align="right"><a onClick={() => { escuela.average === -1 ? navigate("/administrador") : navigate("/administrador/reporte/escuela", { state: escuela }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                    </StyledTableRow>
                                ))
                                : from === "ReporteAdministradorEscuela" ?
                                    data?.map((departamento) => (
                                        <StyledTableRow key={departamento.departmentId}>
                                            <StyledTableCell component="th" scope="row">{departamento.departmentName}</StyledTableCell>
                                            <StyledTableCell align="left">{departamento.average === -1 ? "N/A" : `${departamento.average}%`}</StyledTableCell>
                                            <StyledTableCell align="right"><a onClick={() => { departamento.escuela = props.escuela; departamento.average === -1 ? console.error("No se puede mostrar más detalle") : navigate("/administrador/reporte/escuela/departamento", { state: departamento }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                    : from === "ReporteAdministradorDepartamento" ?
                                        data?.map((profesor) => (
                                            <StyledTableRow key={profesor.nomina}>
                                                <StyledTableCell component="th" scope="row">{profesor.employeeName}</StyledTableCell>
                                                <StyledTableCell align="left">{profesor.nomina}</StyledTableCell>
                                                <StyledTableCell align="left">{profesor.average === -1 ? "N/A" : `${profesor.average}%`}</StyledTableCell>
                                                <StyledTableCell align="right"><a onClick={() => { profesor.escuela = props.escuela; profesor.departamento = props.departamento; profesor.average === -1 ? navigate("/administrador/reporte/escuela/departamento") : navigate("/administrador/reporte/escuela/departamento/profesor", { state: profesor }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                        : from === "ReporteAdministradorProfesor" ?
                                            data?.map((clase) => (
                                                <StyledTableRow key={clase.subject_CVE}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {clase.subjectName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">{clase.subject_CVE}</StyledTableCell>
                                                    <StyledTableCell align="left">{clase.average === -1 ? "N/A" : `${clase.average}%`}</StyledTableCell>
                                                    <StyledTableCell align="right"><a onClick={() => { clase.escuela = props.escuela; clase.departamento = props.departamento; clase.profesor = props.profesor; clase.average === -1 ? navigate("/administrador/reporte/escuela/departamento/profesor") : navigate("/administrador/reporte/escuela/departamento/profesor/clase", { state: clase }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                            : from === "ReporteAdministradorClase" ?
                                                props.infoClase?.map((horario) => (
                                                    <StyledTableRow key={horario.date}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {horario.date.slice(0, -9)}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{horario.codeDescription}</StyledTableCell>
                                                        <StyledTableCell align="right"><BsPencilSquare className="boton-aceptar" onClick={() => editAttendance(horario.codeId, horario.idSchedule, horario.date)}></BsPencilSquare></StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                                                :
                                                props.data?.map((profesor) => (
                                                    <StyledTableRow key={profesor.nomina + profesor.subject_CVE + profesor.schedule + profesor.days + profesor.classroom}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {profesor.employeeName}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="left">{profesor.nomina}</StyledTableCell>
                                                        <StyledTableCell align="left">{profesor.subjectName}</StyledTableCell>
                                                        <StyledTableCell align="left">{profesor.subject_CVE}</StyledTableCell>
                                                        <StyledTableCell align="left">{profesor.schedule}</StyledTableCell>
                                                        <StyledTableCell align="left">{profesor.days}</StyledTableCell>
                                                        <StyledTableCell align="left">{profesor.classroom}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            { /* EDIT ATTENDANCE CODE MODAL */}
            <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Editar asistencia</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <label for="attendance" className='label text-dark'>Asistencia del día</label>
                            <select id="attendance" name="attendance" className='select-attendance mb-3' value={attendance} onChange={(event) => setAttendance(event.target.value)}>
                                <option value="0">Asistencia</option>
                                <option value="1">Retraso Inicial</option>
                                <option value="2">Salida Previa</option>
                                <option value="3">Retraso y Salida Previa</option>
                                <option value="4">Falta</option>
                                <option value="5">Aviso</option>
                                <option value="6">Unidad Externa</option>
                                <option value="7">Reposición Programada</option>
                                <option value="8">Adelanto</option>
                                <option value="9">Autorización</option>
                                <option value="10">Clase Repuesta</option>
                            </select>
                            <button id="sendButton" className="btn-send">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TablaAsistencia;