import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Grid, TextField, Card, Button, CardContent, FormControl, FormHelperText} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import * as yup from "yup";

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

      create : {
        background: '#ffffff',
        color: '#7EBDCE',
        '&:hover': {
          background: '#ffffff'
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

const CrearProducto = ({refrestRequestProduct}) => {

    const classes = useStyles();

  
  const schema = yup.object().shape({
    name: yup.string().required('Campo requerido'),
    price: yup.string().required('Campo requerido'),
});

  const { register, handleSubmit, control,  errors, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (info) => {

    const inforUser = {
      name: info.name,
      price: parseInt(info.price),
    }
    
    axios.post('http://www.facturacionafg.somee.com/api/Products/', inforUser)
    .then((response) =>{console.log(response.status); refrestRequestProduct()})
    .catch((error) =>console.log(error))
   
  }


    return (
        <>
         <Card elevation = {0} style={{background: 'rgb(250 250 250)'}}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={3} alignItems="center" style = {{background: 'rgb(250 250 250)', borderRadius: 15, display: 'flex', justifyContent: 'space-evenly'}}>
              <Grid item xs={12} md={6} lg={4} style={{display: 'flex'}}>
              <FormControl fullWidth shrink={true}  notched={true} size="small">
              <TextField
                fullWidth
                inputRef={register}
                variant="outlined"
                placeholder = 'Nombre'
                label = "Nombre"
                size = "small"
                InputLabelProps = {{ shrink: true}}
                className = {classes.dropdownMultiple}
                defaultValue=''
                name="name"
                error={errors.hasOwnProperty('name') && errors['name'].message} 
                helperText = {errors.hasOwnProperty('name') && errors['name'].message}                             
              />
              </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4} style={{display: 'flex'}}>
              <FormControl fullWidth shrink={true}  notched={true} size="small">
              <TextField
                fullWidth
                inputRef={register}
                variant="outlined"
                type="number"
                placeholder = 'Precio'
                label = "Precio"
                size = "small"
                InputLabelProps = {{ shrink: true}}
                className = {classes.dropdownMultiple}
                defaultValue=''
                name="price"
                error={errors.hasOwnProperty('price') && errors['price'].message} 
                helperText = {errors.hasOwnProperty('price') && errors['price'].message}                             
              />
              </FormControl>
              </Grid>
               <Grid item xs={12} sm={12} lg={4}>
              <Button  type="submit"  className = { classes.create }>FINALIZAR</Button>&nbsp;&nbsp;
              <Button  type="submit"  className = { classes.create }>CANCELAR</Button>&nbsp;&nbsp;
            </Grid>
            </Grid>
          </form>
         </CardContent>
        </Card>
        </>
    )
}

export default CrearProducto;