import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import {Paper, Tooltip, Typography} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function DetalleFactura({purchProducts}) {
  const classes = useStyles();

  console.log(purchProducts?.detailInvoice)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell align="left">Producto</TableCell>
            <TableCell align="left">Precio Und.</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchProducts?.detailInvoice?.map((prod) => (
            <TableRow>
             
                     <TableCell component="th" scope="row">
                     {prod?.cantidad}
                   </TableCell>
                   <TableCell align="left">{prod?.product?.name}</TableCell>
                   <TableCell align="left">{prod?.product?.price}</TableCell>
                   <TableCell align="left">{prod?.product?.price * prod?.cantidad}</TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography style={{textAlign: 'end', marginRight: 25}}>Total:  </Typography>
    </TableContainer>
  );
}
