import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Card, Button, CardContent, InputLabel, MenuItem, Select,Typography, FormControl, FormHelperText} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { styles } from '../styles';
import axios from 'axios';
import * as yup from "yup";
import Alerta from '../utils/alert';


const AgregarProducto = ({allProducts, countProducts, purchProducts}) => {

    const classes = styles();
    const [isAlert, setIsAlert] = useState(false)
    const schema = yup.object().shape({
        product: yup.string().required('Campo requerido'),
        cuantity: yup.string().required('Campo requerido'),
    });
    
      const { register, handleSubmit, control,  errors, setValue } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched",
        reValidateMode: "onChange",
      });

      const onSubmit = (data) => {
        axios.get(`https://localhost:44361/api/Products/${data.product}`)
        .then((response) =>{
            const filterProduct = purchProducts.find((x)=> x.producto.id === response.data.id)
        
            if(filterProduct){
                setIsAlert(true)
                setTimeout(() => {
                setIsAlert(false)
                }, 2000);
            } else {
                countProducts( {cuantity: data.cuantity, producto: response.data})
                setValue('cuantity', '')
                setValue('product', '')
            }

        })
        .catch((error) =>console.log(error))

      }
    
    return (
        <Card elevation = {0} style={{background: 'transparent'}}>
        <CardContent>
      <form  onSubmit={handleSubmit(onSubmit)}  className={classes.form}>
        <Typography component='h1' variant='h10' style={{textAlign:'center', marginBottom: 10}}>
          Agregar Producto
        </Typography>
        <Grid container spacing={3} alignItems="center" style = {{background: 'transparent', borderRadius: 15, display: 'flex'}}>
            <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    variant="outlined"
                    className = { classes.dropdown}
                    inputRef={register}
                    size = 'small'
                    type="number"
                    placeholder="Cantidad"
                    defaultValue = ''
                    label="Cantidad"
                    InputLabelProps = {{ shrink: true}}
                    name="cuantity"
                    error={!!errors.hasOwnProperty("cuantity") && errors["cuantity"].message}
                    helperText={errors.hasOwnProperty("cuantity") && errors["cuantity"].message}
                />
               
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
            <FormControl variant="outlined" fullWidth  size="small" >
              <InputLabel htmlFor="outlined-select-product" shrink={true}  size="small">Producto</InputLabel>
              <Controller 
                inputRef={register}
                control={control}
                className = {classes.dropdown}
                label="Producto"
                defaultValue=''
                notched={true}
                name="product"
                as={
                    <Select>
                        {allProducts?.map((x) => (
                          <MenuItem
                        //  className={classes.menuItem}
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
            </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <Button
                  type="submit"
                //   form="addProduct"
                  fullWidth
                  variant="outlined" 
                 className = { classes.addProduct }
              >
                Agregar
            </Button>
         </Grid>
        </Grid>
      </form>
      {isAlert && <Alerta open={isAlert} text={'Producto ya Ingresado'}/>}
      </CardContent>
      </Card>
    )
}

export default AgregarProducto
