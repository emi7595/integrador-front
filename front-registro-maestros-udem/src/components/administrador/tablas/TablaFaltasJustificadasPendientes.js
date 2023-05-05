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
import { Box, IconButton, TableFooter, TablePagination } from '@mui/material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { Modal } from 'bootstrap';


const TablaFaltasJustificadasPendientes = (props) => {
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
    const { headers, data, actualizarData} = props;
    const [valor1, setValor1] = useState('');
    const [valor2, setValor2] = useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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

    const enviarValores = async (idReposition, classroom, event, myModal) => {
        try {
            //console.log(myModal);
            myModal.hide();
            var jsonData = { "idReposition": idReposition, "classroom": classroom, "numEvent": event }
            console.log(jsonData)
            const response = await fetch("http://192.168.3.6:5096/Repositions/AssignClassroomEvent", {
                method: 'PUT',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });
            if (!response.ok) {
                throw new Error("Algo salió mal.");
            }
            else {
                fetch("http://192.168.3.6:5096/Repositions/Admin/GetPendingReposition")
				.then(async (response) => { 
                    const body = await response.text();
                    console.log(body);
                    const data = body.length ? JSON.parse(body) : [{
						employeeName: "No hay reportes pendientes",
						nomina: "",
                        idReposition: "",
                        subjectName: "",
						subject_CVE: "",
						date: "",
						startTime: "",
						classroom: "",
                        eventNum: "",
                        idSchedule: "",
                        idCode: ""
					}];
                    return data;
                })
				.then(json => {
                    actualizarData(json);
				})
                .catch(error => console.error(error));
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    function assignClassroomEvent(idReposition) {
        const myModal = new Modal(document.getElementById('assignModal'));
        myModal.show();
        // Clear inputs
        document.getElementById("classroomInput").value = "";
        document.getElementById("eventInput").value = "";
        const enviarBtn = document.getElementById("sendButton");
        enviarBtn.addEventListener("click", () => {
            let classroom = document.getElementById("classroomInput").value;
            let event = parseInt(document.getElementById("eventInput").value);
            // Clear inputs
            document.getElementById("classroomInput").value = "";
            document.getElementById("eventInput").value = "";
            enviarValores(idReposition, classroom, event, myModal);
        });
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized pagination table">
                    <TableHead>
                        <TableRow>
                            {headers?.map((header, index) => header === "Registro" ? <StyledTableCell key={header} align="center">{header}</StyledTableCell> : index === 0 ? <StyledTableCell key={header}>{header}</StyledTableCell> : index === headers.length - 1 ? <StyledTableCell key={header} align='left'>{header}</StyledTableCell> : <StyledTableCell key={header} align="left">{header}</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0
                                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : []
                            ).map((profesor) => (
                                <StyledTableRow key={profesor.idReposition} >
                                    <StyledTableCell component="th" scope="row">
                                        {profesor.employeeName}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{profesor.nomina}</StyledTableCell>
                                    <StyledTableCell align="left">{profesor.subjectName}</StyledTableCell>
                                    <StyledTableCell align="left">{profesor.subject_CVE}</StyledTableCell>
                                    <StyledTableCell align="left">{profesor.date.split("T")[0]}</StyledTableCell>
                                    <StyledTableCell align="left">{profesor.startTime.slice(0,5)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {profesor.employeeName !== "No hay reportes pendientes" &&
                                        <BsPencilSquare className="boton-aceptar" onClick={() => assignClassroomEvent(profesor.idReposition)}></BsPencilSquare>
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={7}
                                count={data.length}
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
                </Table>
            </TableContainer>

            { /* ASSIGN CLASSROOM AND EVENT NUMBER MODAL */}
            <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Asignar salón y número de evento</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <label for="classromInput" className='label text-dark'>Salón</label>
                            <input type="text" className="input-faltas-pendientes mb-3 form-control" id="classroomInput" placeholder="Salón de clases" value={valor1} onChange={event => setValor1(event.target.value)}></input>
                            <label for="eventInput" className='label text-dark'>Número de evento</label>
                            <input className="input-faltas-pendientes mb-3 form-control" id="eventInput" placeholder="Número de evento de BANNER" value={valor2} onChange={event => setValor2(event.target.value)}></input>
                            <button id="sendButton" className="btn-send">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TablaFaltasJustificadasPendientes;