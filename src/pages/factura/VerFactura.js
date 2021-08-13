import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, CardContent,Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Alerta from '../utils/alert';
import DetalleFactura from './verDetalleFactura';
import moment from 'moment';



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

const VerFactura = (props) => {
  console.log(props)
  const facturaId = props.match.params.id

    const classes = useStyles();
    const [isAlert, setIsAlert] = useState(false)
    const [factura, setFactura] = useState([]);
    const [purchProducts, setPurchProducts] = useState([]);
   
  console.log(factura)
  

  useEffect(() => {
    const getInvoice = () => {
      axios.get(`https://localhost:44361/api/Invoice/${facturaId}`)
        .then((response) =>setFactura(response?.data))
        .catch((error) =>console.log(error))
    }
    getInvoice();
  },[])



   return (
        <>
         <Card elevation = {0} style={{background: 'withe', width: '60%', margin:'auto'}}>
        <CardContent>
          <form id="formularioCompleto"  >
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
              <Grid item xs={12} md={6} lg={3} style={{display: 'flex'}}><strong>FECHA : </strong> {moment(factura.date).format('L')}</Grid> 
              <Grid item xs={12} md={6} lg={3} style={{display: 'flex'}}><strong>ATENDIO : </strong>{factura.nameShopkeeper}</Grid>
              <Grid  item xs={12} md={6} lg={4}><strong>CLIENTE : </strong>{factura.nameClient}</Grid>
              </Grid>
              </Grid>
              <hr style={{fontSize: 'xx-large'}}/>
               <Grid item xs={12} sm={12} lg={4}>
            </Grid>
          </form>
            {isAlert && <Alerta open={isAlert} text={'Ingresa algún producto'}/>}
          < DetalleFactura purchProducts={[factura]} />
         </CardContent>
        </Card>
        </>
    )
}

export default VerFactura;