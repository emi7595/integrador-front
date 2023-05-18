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

const TablaRectorAsistencia = (props) => {
    const { headers, data, from } = props;
    const navigate = useNavigate();

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
                        {headers?.map((header, index) => header === "Registro" ? <StyledTableCell key={header} align="center">{header}</StyledTableCell> : index === 0 ? <StyledTableCell key={header}>{header}</StyledTableCell> : index === headers.length - 1 ? <StyledTableCell key={header} align="right">{header}</StyledTableCell> : <StyledTableCell key={header} align="left">{header}</StyledTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        from === "ReporteRector" ?
                            data?.map((escuela) => (
                                <StyledTableRow key={escuela.schoolId}>
                                    <StyledTableCell component="th" scope="row">{escuela.schoolName}</StyledTableCell>
                                    <StyledTableCell align="left">{escuela.average === -1 ? "N/A" : `${escuela.average}%`}</StyledTableCell>
                                    <StyledTableCell align="right"><a onClick={() => { escuela.average === -1 ? navigate("/rector") : navigate("/rector/reporte/escuela", { state: escuela }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                </StyledTableRow>
                            ))
                            : from === "ReporteRectorEscuela" ?
                                data?.map((departamento) => (
                                    <StyledTableRow key={departamento.departmentId}>
                                        <StyledTableCell component="th" scope="row">{departamento.departmentName}</StyledTableCell>
                                        <StyledTableCell align="left">{departamento.average === -1 ? "N/A" : `${departamento.average}%`}</StyledTableCell>
                                        <StyledTableCell align="right"><a onClick={() => { departamento.escuela = props.escuela; departamento.average === -1 ? console.error("No se puede mostrar más detalle") : navigate("/rector/reporte/escuela/departamento", { state: departamento }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                    </StyledTableRow>
                                ))
                                : from === "ReporteRectorDepartamento" ?
                                    data?.map((profesor) => (
                                        <StyledTableRow key={profesor.nomina}>
                                            <StyledTableCell component="th" scope="row">{profesor.employeeName}</StyledTableCell>
                                            <StyledTableCell align="left">{profesor.nomina}</StyledTableCell>
                                            <StyledTableCell align="left">{profesor.average === -1 ? "N/A" : `${profesor.average}%`}</StyledTableCell>
                                            <StyledTableCell align="right"><a onClick={() => { profesor.escuela = props.escuela; profesor.departamento = props.departamento; profesor.average === -1 ? navigate("/rector/reporte/escuela/departamento") : navigate("/rector/reporte/escuela/departamento/profesor", { state: profesor }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                    : from === "ReporteRectorProfesor" ?
                                        data?.map((clase) => (
                                            <StyledTableRow key={clase.subject_CVE}>
                                                <StyledTableCell component="th" scope="row">
                                                    {clase.subjectName}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{clase.subject_CVE}</StyledTableCell>
                                                <StyledTableCell align="left">{clase.average === -1 ? "N/A" : `${clase.average}%`}</StyledTableCell>
                                                <StyledTableCell align="right"><a onClick={() => { clase.escuela = props.escuela; clase.departamento = props.departamento; clase.profesor = props.profesor; clase.average === -1 ? navigate("/rector/reporte/escuela/departamento/profesor") : navigate("/rector/reporte/escuela/departamento/profesor/clase", { state: clase }) }}><BsThreeDots className="icono-detalle"></BsThreeDots></a></StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                        : from === "ReporteRectorClase" ?
                                            props.infoClase?.map((horario) => (
                                                <StyledTableRow key={horario.date}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {horario.date.slice(0, -9)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{horario.codeDescription}</StyledTableCell>
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
    );
}

export default TablaRectorAsistencia;