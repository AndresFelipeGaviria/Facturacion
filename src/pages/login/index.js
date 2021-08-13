
  
import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import Alerta from '../utils/alert';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignInSide(props) {
  const classes = useStyles();
  const [isAlert, setIsAlert] = useState(false)

  const schema = yup.object().shape({
    username: yup.string().nullable().required('Campo requerido'),
    password: yup.string().nullable().required('Campo requerido')
  })
  
  const {register, errors, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange"
  })
  
  const onSubmit = (data) => {
    console.log(data)
    axios.post(`https://facturacionback20210813172116.azurewebsites.net/api/Auth`,data)
    .then((response) =>{
      if(response.status >= 200 && response.status <= 201){
        props.history.push('/dashboard/factura')
      } 
    })
    .catch((error) =>{
      setIsAlert(true)
      setTimeout(() => {
      setIsAlert(false)
      }, 2000);
    })
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
            {isAlert && <Alerta open={true} type={'error'} text={'Usuario no encontrado'}/>}

          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} md={12} lg={12}>
            <FormControl fullWidth>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef = {register}
              fullWidth
              // id="username"
              label="Nombre"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.hasOwnProperty("username") && errors["username"].message}
              helperText={errors.hasOwnProperty("username") && errors["username"].message}
            />
            </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
            <FormControl fullWidth>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef = {register}
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              // id="password"
              // autoComplete="current-password"
              error={!!errors.hasOwnProperty("password") && errors["password"].message}
              helperText={errors.hasOwnProperty("password") && errors["password"].message}
            />
            </FormControl>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}