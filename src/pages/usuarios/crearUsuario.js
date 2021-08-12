import React, { useState } from 'react';
// import * as IdKey from 'short-uuid';
import { useForm } from "react-hook-form";
// import ModalConfirm from '../../utils/form/modalConfirmBase';
import { Grid, TextField, Card, Button, CardContent, FormControl, FormHelperText} from "@material-ui/core";
// import Snackbars from "../../componentes/snackbars/SnackBars";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from '@material-ui/core/styles';
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

// export const STATE = getState();
const CrearUsuario = ({closeCreate, stateEdit}) => {

    const classes = useStyles();
    const [openStatus, setOpenStatus] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [data, setData]= useState(false);
    const [disabledOnsubmit, setDisabledOnsubmit] = useState(false);
   
    const [informationUser, setInformationUser] = useState(defaultValues); 

    const [message, setMessage] = useState({
      description : '',
      textButtonSubmit : '',
      handleClick : () => {} ,
      handleClickOut : () => {},
      oneButtons : false,
      type : '',
      open : false
  })
  
    const [confirm, setConfirm] = useState({
      open: false,
      question: "",
      handleClickOut: () => {},
      handleClick: () => {},
    });
  
    const closeMessage = () => {
      setMessage((anterior) => ({
        ...anterior,
        open: false,
      }));
    };
  
    const closeModal = () => {
      setDisabledOnsubmit(false);
      setConfirm((anterior) => ({
        ...anterior,
        open: false,
      }));
    };

    const handleClickOut = () => {setMessage({...message, open: false});  setDisabledOnsubmit(false); }
    const handleClickClose = () => {
      setMessage({...message, open: false}); 
      setDisabledOnsubmit(false);
      setValue('name');
      setInformationUser(defaultValues)
    }
  
    const cancelConfirm = () => {
      const create = "¿Está seguro que NO desea continuar creando el registro?"
          setMessage({
            description : create,
            textButtonSubmit : 'Aceptar',
            handleClick : () => handleClickOut(),
            handleClickOut: () => handleClickClose(),
            type : 'WARNING',
            open : true
        })
    };

    const cancel = () => {
      closeModal();
      setMessage({
        open: true,
        text: "Registro cancelado",
        type: "warning",
        fontColor: "#BA8A08",
        handleClose: closeMessage,
      });
      setTimeout(() => {
        closeCreate();
      }, 1000);
    };

  const schema = yup.object().shape({
    name: yup.string().required('Campo requerido'),
    telephone: yup.string().required('Campo requerido'),
    address: yup.string().required('Campo requerido')
});

  const { register, handleSubmit, control,  errors, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (info) => {
    setDisabledOnsubmit(true)
   
  }

  const openModalStatus = () => setOpenStatus(true)

  
  const refresh = () =>  stateEdit(); 

  
  const buttonDisabled = informationUser.name.length > 0 && !errors.name ;


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
                placeholder = 'Telefono'
                label = "Telefono"
                size = "small"
                InputLabelProps = {{ shrink: true}}
                className = {classes.dropdownMultiple}
                defaultValue=''
                // onChange={handleOnChange}
                name="telephone"
                error={errors.hasOwnProperty('telephone') && errors['telephone'].message} 
                helperText = {errors.hasOwnProperty('telephone') && errors['telephone'].message}                             
              />
              </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={4} style={{display: 'flex'}}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    className={classes.dropdownMultiple}
                    variant="outlined"
                    defaultValue = ''
                    size = 'small'
                    InputLabelProps={{ shrink: true }}
                    inputRef={register}
                    label = 'Direccion'
                    name = 'address'
                    error={errors.hasOwnProperty('address') && errors['address'].message} 
                    helperText = {errors.hasOwnProperty('address') && errors['address'].message}                             
                    // value={informationUser.name}
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

export default CrearUsuario;