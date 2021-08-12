import React, {useEffect, useState} from 'react'
import { Typography } from '@material-ui/core';
import RegistrosUser from './registrosUser';
import CreateUser from './crearUsuario';
import axios from 'axios';

const Usuarios = () => {

    const [allUsers, setAllUsers] = useState([])
    useEffect(() =>{
        axios.get('https://localhost:44320/api/Clients')
        .then((response) =>setAllUsers(response?.data))
        .catch((error) =>console.log(error))
    },[])
    return (
        <div>
            <Typography>
                Crear Usuario
            </Typography>
            <CreateUser />
            <Typography>
                Usuarios
            </Typography>
            <RegistrosUser allUsers={allUsers}/>
        </div>
    )
}

export default Usuarios
