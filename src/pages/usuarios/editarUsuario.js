import React, { useState, useEffect }from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Grid, InputLabel, Select,MenuItem, TextField, Typography, FormControl, FormHelperText, Card, CardContent,} from "@material-ui/core";
import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import _ from 'lodash';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.24)",
    outline: "none",
    borderRadius: 8,
    padding: theme.spacing(2, 4, 3),
  },
  accept: {
    background: "#E5E5E5",
    color: "#7EBDCE",
    marginRight: "5%",
    "&:hover": {
      background: "#E5E5E5",
    },
  },
  cancel: {
    background: "#7EBDCE",
    color: "white",
    "&:hover": {
      background: "#7EBDCE",
    },
  },
  text: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: "#545353",
    textAlign: "center",
    margin: "25px 20px",
  },
  titleAlert: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#545353",
  },
    titleCreate: {
      fontFamily: "Roboto",
      fontSize: 24,
      fontStyle: "normal",
      fontWeight: 'normal',
      letterSpacing: "0em",
      textAlign: "left",
      marginBottom: 32
    },
}));

const ModalEditClient = ({
  userId,
  refrestRequestUser
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false)

  const schema = yup.object().shape({
    name: yup.string().required('Compo Requerido'),
    telephone: yup.string().required('Campo requerido'),
    address: yup.string().required('Campo requerido')
  });
  
  const { register, handleSubmit, errors, control, setValue} = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange"
  });


  useEffect(() => {
      if(userId){
        axios.get(`http://www.facturacionafg.somee.com/api/Clients/${userId.id}`)
        .then((response) =>{setValue('name', response.data.name)
        setValue('telephone', response.data.telephone)
        setValue('address', response.data.address)})
        .catch((error) =>console.log(error))
       
      }
      setOpenModal(!openModal)
  }, [])

  const onSubmit = (data) => {

    const inforUser = {
        name: data.name,
        telephone: parseInt(data.telephone),
        address: data.address,
      }

    axios.put(`http://www.facturacionafg.somee.com/api/Clients/${userId.id}`, inforUser)
    .then(() =>{
      setValue('name','')
      setValue('telephone', '')
      setValue('address', '')
      refrestRequestUser();
      closeModal(false);
    })
    .catch((error) =>console.log(error))
  }


  const closeModal = () => setOpenModal(!openModal)

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Card className={classes.card} elevation = {0} >
      <CardContent>
      <Typography className={classes.titleCreate}>
          Editar Usuario
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={3} alignItems="center" direction="column" style = {{background: 'rgb(250 250 250)', borderRadius: 15, display: 'flex', justifyContent: 'space-evenly'}}>
              <Grid item xs={12} md={6} lg={12} style={{display: 'flex', width: 'inherit'}}>
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
              <Grid item xs={12} md={6} lg={12} style={{display: 'flex', width: 'inherit'}}>
              <FormControl fullWidth shrink={true}  notched={true} size="small">
              <TextField
                fullWidth
                inputRef={register}
                variant="outlined"
                type="number"
                placeholder = 'Telefono'
                label = "Telefono"
                size = "small"
                InputLabelProps = {{ shrink: true}}
                className = {classes.dropdownMultiple}
                defaultValue=''
                name="telephone"
                error={errors.hasOwnProperty('telephone') && errors['telephone'].message} 
                helperText = {errors.hasOwnProperty('telephone') && errors['telephone'].message}                             
              />
              </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={12} style={{display: 'flex', width: 'inherit'}}>
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
                  />
                </FormControl>   
              </Grid>
               <Grid item xs={12} sm={12} lg={4}>
              <Button  type="submit"   className = { classes.create }>FINALIZAR</Button>&nbsp;&nbsp;
              <Button   onClick={closeModal} className = { classes.create }>CANCELAR</Button>&nbsp;&nbsp;
            </Grid>
            </Grid>
          </form>
     </CardContent>
      
    </Card>
    </div>
  );

  return (
    <div>
      <Modal
        style={{ textAlign: "center" }}
        open={openModal}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
      >
        {bodyModal}
      </Modal>
    </div>
  );
};

export default ModalEditClient;
