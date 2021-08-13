import React, {useState} from 'react';
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
import EditarProducto from './editarProducto';
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

export default function CustomizedTables({allProductos, refrestRequestProduct}) {

  const [productId, setProductId] = useState();
  const classes = useStyles();

  const deleteProduct = (id) => {
    axios.delete(`https://localhost:44361/api/Products/${id}`)
    .then((response) =>refrestRequestProduct())
    .catch((error) =>console.log(error))
  }
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ProductID</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Pecio</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allProductos?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">
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
                  onClick={() => deleteProduct(row.id)}
                //   onClick={() => onDelete(data.id)}
                  className={classes.iconEvent}
                />
              </Tooltip>
          </div>
          {productId === row.id && < EditarProducto productId={row} refrestRequestProduct={refrestRequestProduct}/>}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}
