import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Card, Button, CardContent, InputLabel, MenuItem, Select,Typography, FormControl, FormHelperText} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import deLocale from "date-fns/locale/es";
// import { styles } from '../styles';
import * as yup from "yup";
import Alerta from '../utils/alert';
import AgregarProducto from './agregarProducto';
import DetalleFactura from './detalleFactura';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';

const defaultValues = {
 code: null,
 status: null,
 name: ''
};

const useStyles = makeStyles((theme) => ({
    form: {
        width: 'auto',
        marginTop: 20,
        position: 'relative',
    },
      formControl: {
        padding: "8px",
        maxHeight: "48px",
        maxWidth: "331px",
      },
      iconCreate: {
        textAlign: "left",
        color: "#098B8B",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        margin: "10px auto",
      },

      menuItem: {
        "&:hover": {
          borderLeft: "4px solid #098B8B",
        },
      },

      dropdown: {
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        borderRadius: "8px",
        height: 40,
        fontSize: "14px",
        [`& fieldset`]: {
          borderRadius: 8,
          fontSize: 14,
        },
      },
      dropdownMultiple: {
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        borderRadius: "8px",
        fontSize: "14px",
        [`& fieldset`]: {
          borderRadius: 8,
          fontSize: 14,
        },
      },

      addProduct : {
        background: 'green',
        color: '#ffffff',
        '&:hover': {
          background: 'green'
        }
      },
      create : {
        marginLeft: '80%',
        marginTop: 10,
        background: 'gray',
        color: '#ffffff',
        '&:hover': {
          background: 'gray'
        }
      },

      buttonSearch: {
        color: "#ffffff",
        background: "#7EBDCE ",
        "&:hover": { color: "white", background: "#7EBDCE" },
      },
      buttonClear: {
        color: "#0366D6",
        "&:hover": { background: "transparent" },
      },
      titleCreate: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 500,
        letterSpacing: '0em',
        textAlign: 'left'
      },
      
      messageSearch: {
        justifyContent: 'center', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '10%',
        display: 'flex', 
      },
    
      formField: {
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        borderRadius: "8px",
        height: "35px",
        fontSize: "14px",
        [`& fieldset`]: {
          borderRadius: 8,
          fontSize: 14,
        },
        "& .MuiInputBase-root.Mui-disabled": {
          backgroundColor: "#e0e0e0",
        },
      },
    
  }));

const Factura = () => {

    const classes = useStyles();
    const [isAlert, setIsAlert] = useState(false)
    const [allClients, setAllClients] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [purchProducts, setPurchProducts] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
   
  
  const schema = yup.object().shape({
    date: yup.string().required('Campo requerido'),
    nameShopkeeper: yup.string().required('Campo requerido'),
    clientId: yup.string().required('Campo requerido'),

});

  const { register, handleSubmit, control,  errors, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });


  const productos = purchProducts?.map(function (x){
    const obj = {cantidad: '', productId: ''}
    obj.cantidad = parseInt(x.cuantity);
    obj.productId = parseInt(x.producto.id)
    return obj;
  } 
   )

  const onSubmit = (info) => {

if(purchProducts.length > 0) {
    const invoice = {
      date: new Date(info.date),
      clientId: parseInt(info.clientId),
      nameShopkeeper: info.nameShopkeeper,
      detailInvoiceDto: productos
    }

    axios.post('https://localhost:44361/api/Invoice/', invoice)
    .then((response) =>console.log(response.status))
    .catch((error) =>console.log(error))
} else {
  setIsAlert(true)
  setTimeout(() => {
  setIsAlert(false)
  }, 2000);
}
  } 


  useEffect(() => {
    const getAllUser = () => {
      axios.get('https://localhost:44361/api/Clients')
        .then((response) =>setAllClients(response?.data))
        .catch((error) =>console.log(error))
    }
    getAllUser();

    const getAllProducts = () => {
      axios.get('https://localhost:44361/api/Products')
      .then((response) =>setAllProducts(response?.data))
      .catch((error) =>console.log(error))
    }
    getAllProducts();
  },[])


  const countProducts = (prod) => {
    const products = [...purchProducts];
    products.push(prod)
    setPurchProducts([...products])
  }

  const deleteNewProduct = (data) => setPurchProducts(data)


   return (
        <>
         <Card elevation = {0} style={{background: 'withe', width: '60%', margin:'auto'}}>
        <CardContent>
          <form id="formularioCompleto" onSubmit={handleSubmit(onSubmit)} >
            <Typography style={{textAlign: 'center'}}>
                Super Mercado La Perla <br/>
                Medellin S.A.S <br/>
                <br />
                Nit 13434455 <br />
                Carrera 45 # 53-53 La Gallera <br />
                tel: 343555334
            </Typography>
            <hr style={{fontSize: 'xx-large'}}/>
            <Grid container spacing={3} alignItems="center" direction="row"style = {{background: 'white', borderRadius: 15, display: 'flex', justifyContent: 'space-evenly'}}>

                <Grid container spacing={2} direction="row" justify="center" style={{marginTop: 15, marginLeft:10, marginBottom:10}}>
              <Grid item xs={12} md={6} lg={3} style={{display: 'flex'}}>

              <FormControl fullWidth>
                
              
              <TextField
                    fullWidth
                    className={classes.dropdownMultiple}
                    variant="outlined"
                    defaultValue = ''
                    type="date"
                    size = 'small'
                    InputLabelProps={{ shrink: true }}
                    inputRef={register}
                    label = 'Fecha'
                    name = 'date'
                    error={errors.hasOwnProperty('date') && errors['date'].message} 
                    helperText = {errors.hasOwnProperty('date') && errors['date'].message}
                  />
                    
                
                

              </FormControl>
              </Grid> 
              
              <Grid item xs={12} md={6} lg={3} style={{display: 'flex'}}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    className={classes.dropdownMultiple}
                    variant="outlined"
                    defaultValue = ''
                    type="text"
                    size = 'small'
                    InputLabelProps={{ shrink: true }}
                    inputRef={register}
                    label = 'Quien atendio'
                    name = 'nameShopkeeper'
                    error={errors.hasOwnProperty('nameShopkeeper') && errors['nameShopkeeper'].message} 
                    helperText = {errors.hasOwnProperty('nameShopkeeper') && errors['nameShopkeeper'].message}
                  />
                </FormControl>  
              </Grid>
             
              <Grid  item xs={12} md={6} lg={4}>
              <FormControl variant="outlined" fullWidth  size="small"  error={!!errors.hasOwnProperty('clientId') && errors['clientId'].message}>
                  <InputLabel htmlFor="outlined-select-clientId" shrink={true}  size="small">Cliente</InputLabel> 
                  <Controller 
                    control={control}
                   inputRef={register}
                   className = {classes.dropdown}
                   label="Cliente"
                   defaultValue=''
                   notched={true}
                    name="clientId"
                  as={
                    <Select >
                         {allClients?.map((x) => (
                          <MenuItem
                          key={x.id}
                          value={ x.id}
                        >
                          { x.name}
                        </MenuItem>
                           )
                         )}
                   </Select>
                  }
                  />       
                </FormControl>
                <FormHelperText style={{ color: "#f44336", paddingLeft: 14 }}>{errors.hasOwnProperty('clientId') && errors['clientId'].message}</FormHelperText>
              </Grid>
              </Grid>
              </Grid>
              <hr style={{fontSize: 'xx-large'}}/>
               <Grid item xs={12} sm={12} lg={4}>
            </Grid>
          </form>
            {isAlert && <Alerta open={isAlert} text={'Ingresa algún producto'}/>}
          <AgregarProducto allProducts={allProducts} countProducts={countProducts} purchProducts={purchProducts}/>
          < DetalleFactura purchProducts={purchProducts} countProducts={deleteNewProduct}/>
          <Button type="submit" form="formularioCompleto"  className = { classes.create }>Crear Factura</Button>&nbsp;&nbsp; 
         </CardContent>
        </Card>
        </>
    )
}

export default Factura;