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
// import EditarProducto from './editarProducto';
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

export default function TablaFacturas({allProductos}) {

  const [productId, setProductId] = useState();
  const [allInvoice, setAllInvoice] = useState([])
  const classes = useStyles();

  

  useEffect(() => {
    const getAllInvoices = () => {
      axios.get(`https://localhost:44361/api/Invoice`)
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
            <StyledTableCell align="right">Fecha</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allProductos?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">
              <div className={classes.columnEvent}>
              <Tooltip title="Editar" arrow placement="top">
                <EditIcon
                  onClick={() =>setProductId(row.id)}
                  className={classes.iconEvent}
                />
              </Tooltip>
            &nbsp;&nbsp;
              <Tooltip title="Anular" arrow placement="top">
                <DeleteIcon
                  // onClick={() => deleteProduct(row.id)}
                //   onClick={() => onDelete(data.id)}
                  className={classes.iconEvent}
                />
              </Tooltip>
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
