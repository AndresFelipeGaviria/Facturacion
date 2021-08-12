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
import EditarUsuario from './editarUsuario';
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

export default function CustomizedTables({allUsers}) {

  const [userId, setUserId] = useState();
  const classes = useStyles();

  const deleteUser = (id) => {
    axios.delete(`https://localhost:44320/api/Clients/${id}`)
    .then((response) =>console.log(response.status))
    .catch((error) =>console.log(error))
  }
  console.log(userId)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>UserID</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Telefono</StyledTableCell>
            <StyledTableCell align="right">Direccion</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.telephone}</StyledTableCell>
              <StyledTableCell align="right">{row.address}</StyledTableCell>
              <StyledTableCell align="right">
              <div className={classes.columnEvent}>
              <Tooltip title="Editar" arrow placement="top">
                <EditIcon
                  onClick={() =>setUserId(row.id)}
                  className={classes.iconEvent}
                />
              </Tooltip>
            &nbsp;&nbsp;
              <Tooltip title="Anular" arrow placement="top">
                <DeleteIcon
                  onClick={() => deleteUser(row.id)}
                //   onClick={() => onDelete(data.id)}
                  className={classes.iconEvent}
                />
              </Tooltip>
          </div>
          {userId === row.id && < EditarUsuario userId={row}/>}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}
