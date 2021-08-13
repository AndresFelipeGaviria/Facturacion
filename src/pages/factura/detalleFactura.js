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



export default function DetalleFactura({purchProducts, countProducts}) {
  const classes = useStyles();


const deleteProduct = (id) => {
    
    const filterProduct = purchProducts.filter((x)=> x.producto.id !== id)
    
    countProducts(filterProduct)
}

// const totaFactura = purchProducts.forEach((x)=>  x.cuantity )
// console.log(purchProducts)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell align="left">Producto</TableCell>
            <TableCell align="left">Precio Und.</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchProducts?.map((row) => (
            <TableRow key={row?.producto?.id}>
              <TableCell component="th" scope="row">
                {row?.cuantity}
              </TableCell>
              <TableCell align="left">{row?.producto?.name}</TableCell>
              <TableCell align="left">{row?.producto?.price}</TableCell>
              <TableCell align="left">{row?.producto?.price * row?.cuantity}</TableCell>
              <TableCell align="left">
              <Tooltip title="Anular" arrow placement="top">
                <DeleteIcon
                  onClick={() => deleteProduct(row?.producto?.id)}
                  className={classes.iconEvent}
                />
              </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography style={{textAlign: 'end', marginRight: 25}}>Total:  </Typography>
    </TableContainer>
  );
}
