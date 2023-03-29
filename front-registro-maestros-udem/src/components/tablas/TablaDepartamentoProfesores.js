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


const TablaDepartamentoProfesores = (props)  =>{
    const navigate = useNavigate()
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
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
                <StyledTableCell>Profesor</StyledTableCell>
                <StyledTableCell align="right">Nómina</StyledTableCell>
                <StyledTableCell align="right">Promedio Asistencia</StyledTableCell>
                <StyledTableCell align="right">Detalle</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data?.map((profesor) => (
            <StyledTableRow key={profesor.nomina}>
              <StyledTableCell component="th" scope="row">
                {profesor.employeeName}
              </StyledTableCell>
              <StyledTableCell align="right">{profesor.nomina}</StyledTableCell>
              <StyledTableCell align="right">{profesor.average}%</StyledTableCell>
              <StyledTableCell align="right"><a onClick={() => { navigate("/director-departamento/reporte-profesor", {state: profesor}) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
            </StyledTableRow>
          ))}
            </TableBody>
        </Table>
        </TableContainer>
  );
}

export default TablaDepartamentoProfesores;