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


const TablaVicerrector = (props) => {
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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Departamento</StyledTableCell>
                        <StyledTableCell align="right">Promedio Asistencia</StyledTableCell>
                        <StyledTableCell align="right">Detalle</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data?.map((departamento) => (
                        <StyledTableRow key={departamento.departmentId}>
                            <StyledTableCell component="th" scope="row">
                                {departamento.departmentName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{departamento.average === -1 ? "N/A" : `${departamento.average}%`}</StyledTableCell>
                            <StyledTableCell align="right"><a onClick={() => { departamento.average === -1 ? navigate("/vicerrector") : navigate("/vicerrector/reporte-departamento", { state: departamento }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TablaVicerrector;