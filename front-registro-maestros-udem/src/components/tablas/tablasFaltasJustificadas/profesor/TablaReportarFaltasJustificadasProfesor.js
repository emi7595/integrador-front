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
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, IconButton, TableFooter, TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BsQrCode } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';

const TablaReportarFaltasJustificadasProfesor = (props) => {
    // --- FUNCTION THAT HANDLES PAGINATION ---
    function TablePaginationActions(props2) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props2;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    const { data } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    // --- FUNCTION THAT OPENS MODAL FOR ATTENDANCE AND REGISTERS IT IN DATABASE ---
    const registerAttendance = async (idReposition, idCode) => {
        const myModal = new Modal(document.getElementById('attendanceModal'));
        myModal.show();

        try {
            // POST data
            var jsonData = {
                "idReposition": idReposition,
                "idCode": idCode
            };

            // Post request to database
            const response = await fetch('http://192.168.29.1:5096/Repositions/RegisterRepositionAttendance', {
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


    // --- COMPONENT (HTML) ---
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
                        {
                            (rowsPerPage > 0
                                ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : []
                            )?.map((clase) => (
                                <StyledTableRow key={clase.idReposition}>
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
                            ))
                        }
                        {!data && (
                            <TableRow>
                                <StyledTableCell>No hay reportes de reposiciones o unidades externas.</StyledTableCell>
                            </TableRow>
                        )
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    {data && (
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data?.length }]}
                                    colSpan={7}
                                    count={data?.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    )
                    }
                </Table>
            </TableContainer>

            { /* REGISTER ATTENDANCE MODAL */}
            <div className="modal fade" id="attendanceModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Registro de asistencia</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
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