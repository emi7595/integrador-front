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
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";

const TablaDepartamentoProfesorClase = (props) => {
    const navigate = useNavigate()
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


    // --- COMPONENT (HTML) ---
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Clase</StyledTableCell>
                        <StyledTableCell>Clave</StyledTableCell>
                        <StyledTableCell>Promedio Asistencia</StyledTableCell>
                        <StyledTableCell align="right">Detalle</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data?.map((clase) => (
                        <StyledTableRow key={clase.subject_CVE}>
                            <StyledTableCell component="th" scope="row">
                                {clase.subjectName}
                            </StyledTableCell>
                            <StyledTableCell>{clase.subject_CVE}</StyledTableCell>
                            <StyledTableCell >{clase.average === -1 ? "N/A" : `${clase.average}%`}</StyledTableCell>
                            <StyledTableCell align="right"><a onClick={() => { clase.departamento = props.departamento; clase.profesor = props.profesor; clase.average === -1 ? navigate("/director-departamento/reporte-profesor") : navigate("/director-departamento/reporte-profesor/reporte-clase", { state: clase }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TablaDepartamentoProfesorClase;