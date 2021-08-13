import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Tooltip} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from 'moment';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#7485e4',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TablaFacturas(props) {

  const [productId, setProductId] = useState();
  const [allInvoice, setAllInvoice] = useState([])
  const classes = useStyles();

  

  useEffect(() => {
    const getAllInvoices = () => {
      axios.get(`https://facturacionback20210813172116.azurewebsites.net/api/Invoice`)
      .then((response) =>setAllInvoice(response.data))
      .catch((error) =>console.log(error))
    }
    getAllInvoices();
  }, [])
  
  console.log(allInvoice)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Factura #</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allInvoice?.map((row) => (
            <StyledTableRow key={row.invoiceId}>
              <StyledTableCell component="th" scope="row">
                {row.invoiceId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nameClient}</StyledTableCell>
              <StyledTableCell align="center">{moment(row.date).format('LLL')}</StyledTableCell>
              <StyledTableCell align="right">
              <div className={classes.columnEvent}>
              <Tooltip title="Ver" arrow placement="top">
                <VisibilityIcon
                  onClick={() => props.history.push(`factura/${row.invoiceId}`)}
                  className={classes.iconEvent}
                />
              </Tooltip>
            &nbsp;&nbsp;   
          </div>
          {/* {productId === row.id && < EditarProducto productId={row}/>} */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}
