import React, {useEffect, useState} from 'react'
import { Typography } from '@material-ui/core';
import RegistrosUser from './registrosUser';
import CreateUser from './crearUsuario';
import axios from 'axios';

const Usuarios = () => {

    const [allUsers, setAllUsers] = useState([])
    const [refresTabled, setResfresTabled] = useState(false);

    useEffect(() =>{
        axios.get('https://facturacionback20210813172116.azurewebsites.net/api/Clients')
        .then((response) =>setAllUsers(response?.data))
        .catch((error) =>console.log(error))
    },[refresTabled])

    const refrestRequest = () => {setResfresTabled(!refresTabled);console.log('pasee por la peticion')}
    return (
        <div>
            <Typography style={{textAlign: 'center'}}>
                Crear Cliente
            </Typography>
            <CreateUser refrestRequest={refrestRequest}/>
            <Typography style={{textAlign: 'center'}}>
                Clientes
            </Typography>
            <RegistrosUser 
                allUsers={allUsers}
                refrestRequestUser={refrestRequest}
            />
        </div>
    )
}

export default Usuarios
