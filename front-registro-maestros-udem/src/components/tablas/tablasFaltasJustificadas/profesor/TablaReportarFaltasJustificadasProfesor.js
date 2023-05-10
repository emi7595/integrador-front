/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
//import { useNavigate } from 'react-router-dom';
import { BsQrCode } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';

const TablaReportarFaltasJustificadasProfesor = (props) => {
    //const navigate = useNavigate();

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

    const registerAttendance = async (idReposition, idCode) => {
        const myModal = new Modal(document.getElementById('attendanceModal'));
        myModal.show();

        try {
            // POST data
            var jsonData = {
                "idReposition": idReposition,
                "idCode": idCode
            }

            // Post request to database
            const response = await fetch('http://192.168.3.6:5096/Repositions/RegisterRepositionAttendance', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });

            // There was an error while registering the attendance
            if (!response.ok) {
                throw new Error('Algo salió mal.');
            }
            // Attendance was registered correctly
            else {
                const data = await response.json();
                if (data.message === "Asistencia registrada correctamente.") {
                    document.getElementById("icon-no").style.display = "none";
                    document.getElementById("icon-warning").style.display = "none";
                    document.getElementById("icon-ok").style.display = "inline-block";
                    document.getElementById("attendanceTitle").innerHTML = "Asistencia registrada";
                }
                else if (data.message === "Ya se registró la asistencia para esta reposición.") {
                    document.getElementById("icon-ok").style.display = "none";
                    document.getElementById("icon-no").style.display = "none";
                    document.getElementById("icon-warning").style.display = "inline-block";
                    document.getElementById("attendanceTitle").innerHTML = "Asistencia previamente registrada";
                }
                else {
                    document.getElementById("icon-ok").style.display = "none";
                    document.getElementById("icon-warning").style.display = "none";
                    document.getElementById("icon-no").style.display = "inline-block";
                    document.getElementById("attendanceTitle").innerHTML = "Asistencia no registrada";
                }
                document.getElementById("attendanceContent").innerHTML = data.message;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <TableContainer component={Paper} className='mb-4'>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className="tabla-izq">Clase</StyledTableCell>
                            <StyledTableCell>Clave</StyledTableCell>
                            <StyledTableCell>Fecha</StyledTableCell>
                            <StyledTableCell>Hora Inicio</StyledTableCell>
                            <StyledTableCell>Salón</StyledTableCell>
                            <StyledTableCell>Num. Evento</StyledTableCell>
                            <StyledTableCell align="right" className="tabla-der">Registrar Asistencia</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data?.map((clase) => (
                            <StyledTableRow key={clase.CRN}>
                                <StyledTableCell className="tabla-izq" component="th" scope="row">
                                    {clase.subjectName}
                                </StyledTableCell>
                                <StyledTableCell>{clase.subject_CVE}</StyledTableCell>
                                <StyledTableCell>{clase.date.slice(0, -9)}</StyledTableCell>
                                <StyledTableCell>{clase.startTime.slice(0, 5)}</StyledTableCell>
                                <StyledTableCell>{clase.classroom === "" ? "Pendiente" : clase.classroom}</StyledTableCell>
                                <StyledTableCell>{clase.eventNum === -1 ? "UNIEXT" : clase.eventNum === null ? "Pendiente" : clase.eventNum}</StyledTableCell>
                                <StyledTableCell className="tabla-der" align="right"><a onClick={() => { registerAttendance(clase.idReposition, clase.idCode) }}>{clase.eventNum === -1 ? <></> : <BsQrCode className="icono-detalle"></BsQrCode>}</a></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            { /* REGISTER ATTENDANCE MODAL */}
            <div class="modal fade" id="attendanceModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Registro de asistencia</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <FontAwesomeIcon id="icon-ok" icon={faCheckCircle} color="green" size="6x" />
                            <FontAwesomeIcon id="icon-no" icon={faSquareXmark} color="red" size="6x" />
                            <FontAwesomeIcon id="icon-warning" icon={faCircleExclamation} color="#ffc400" size="6x" />
                            <h2 id="attendanceTitle" className="mt-4"></h2>
                            <h5 id="attendanceContent"></h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TablaReportarFaltasJustificadasProfesor;