import React, {useEffect, useState} from 'react'
import { Typography } from '@material-ui/core';
import RegistrosProducts from './registrosProductos';
import CreateProduct from './crearProducto';
import axios from 'axios';

const Productos = () => {

    const [allProductos, setAllProductos] = useState([])
    const [refresTabled, setResfresTabled] = useState(false);
    
    useEffect(() =>{
        axios.get('https://localhost:44320/api/Products')
        .then((response) =>setAllProductos(response?.data))
        .catch((error) =>console.log(error))
    },[refresTabled])

    const refrestRequest = () => {setResfresTabled(!refresTabled);console.log('pasee por la peticion')}
    return (
        <div>
            <Typography>
                Crear Producto
            </Typography>
            <CreateProduct />
            <Typography>
                Productos
            </Typography>
            <RegistrosProducts 
                allProductos={allProductos}
                refrestRequestProduct={refrestRequest}
            />
        </div>
    )
}

export default Productos
