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
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box, IconButton, TableFooter, TablePagination } from '@mui/material';


const TablaVerProfesores = (props) => {
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

    const { headers, data, buscador } = props;
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

    React.useEffect(() => {
        if (buscador !== null) {
            setPage(0);
        }
    }, [buscador]);


    // --- COMPONENT (HTML) ---
    return (
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
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
    );
}

export default TablaVerProfesores;