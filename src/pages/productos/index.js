import React, {useEffect, useState} from 'react'
import { Typography } from '@material-ui/core';
import RegistrosProducts from './registrosProductos';
import CreateProduct from './crearProducto';
import axios from 'axios';

const Productos = () => {

    const [allProductos, setAllProductos] = useState([])
    const [refresTabled, setResfresTabled] = useState(false);
    
    useEffect(() =>{
        axios.get('http://www.facturacionafg.somee.com/api/Products')
        .then((response) =>setAllProductos(response?.data))
        .catch((error) =>console.log(error))
    },[refresTabled])

    const refrestRequest = () => setResfresTabled(!refresTabled)
    return (
        <div>
            <Typography style={{textAlign: 'center'}}>
                Crear Producto
            </Typography>
            <CreateProduct 
                refrestRequestProduct={refrestRequest}

            />
            <Typography style={{textAlign: 'center'}}>
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
