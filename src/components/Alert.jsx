import React, { useEffect } from "react";
import { Snackbar, Stack } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AlertSnackbar = ({type,openAlert,msg}) =>{
    const [open, setOpen] = React.useState(false);
    
    useEffect(()=> {
        setOpen(openAlert)
    },[openAlert])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    return(
        <Stack>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
      </Stack>
    )
}

export default AlertSnackbar;