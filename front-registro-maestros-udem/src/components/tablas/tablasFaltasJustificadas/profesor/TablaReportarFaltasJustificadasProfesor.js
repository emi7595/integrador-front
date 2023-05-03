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
import { BsQrCode } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

const TablaReportarFaltasJustificadasProfesor = (props)  =>{
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
        <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell className="tabla-izq">Clase</StyledTableCell>
                <StyledTableCell >Clave</StyledTableCell>
                <StyledTableCell >Fecha</StyledTableCell>
                <StyledTableCell >Salón</StyledTableCell>
                <StyledTableCell >Num. Evento</StyledTableCell>
                <StyledTableCell align="right" className="tabla-der">QR</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data?.map((clase) => (
            <StyledTableRow key={clase.CRN}>
              <StyledTableCell className="tabla-izq" component="th" scope="row">
                {clase.subjectName}
              </StyledTableCell>
              <StyledTableCell >{clase.subject_CVE}</StyledTableCell>
              <StyledTableCell >{clase.date.slice(0, -9)}</StyledTableCell>
              <StyledTableCell >{clase.classroom === "" ? "Pendiente" : clase.classroom}</StyledTableCell>
              <StyledTableCell >{clase.eventNum === -1 ? "UNIEXT" : clase.eventNum === null ? "Pendiente" : clase.eventNum}</StyledTableCell>
              <StyledTableCell className="tabla-der" align="right"><a onClick={() => { clase.average === -1 ? navigate("/profesor") : navigate("/profesor/reporte/clase", {state: clase}) }}>{clase.eventNum === -1 ? <></> : <BsQrCode className="icono-detalle"></BsQrCode>}</a></StyledTableCell>
            </StyledTableRow>
          ))}
            </TableBody>
        </Table>
        </TableContainer>
  );
}

export default TablaReportarFaltasJustificadasProfesor;