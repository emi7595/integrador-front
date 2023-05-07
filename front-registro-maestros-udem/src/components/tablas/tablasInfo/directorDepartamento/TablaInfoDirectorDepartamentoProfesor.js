import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const TablaInfoDirectorDepartamentoProfesor = (props)  =>{
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

    const session = JSON.parse(window.sessionStorage.getItem('session'));
	if (session) {
	}

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell >Departamento</StyledTableCell>
                <StyledTableCell>Docente</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {props.departamento}
              </StyledTableCell>
              <StyledTableCell>
                {props.profesor}
              </StyledTableCell>
            </StyledTableRow>
            </TableBody>
        </Table>
        </TableContainer>
  );
}

export default TablaInfoDirectorDepartamentoProfesor;