import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
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
    
  });