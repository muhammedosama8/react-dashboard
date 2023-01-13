import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert, Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ msg, setMsg] = useState('')
  const [ error, setError] = useState(false)
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const handleFormSubmit = (e) => {
    signInWithEmailAndPassword(auth, e.email, e.password)
    .then((userCredential) => {
      console.log(userCredential.user)
    })
    .catch((error) => {
      const errorCode = error.code;
      setError(true)
      console.log(errorCode)
      if(errorCode === 'auth/wrong-password'){
        return setMsg('Password Wrong')
      } else if(errorCode === 'auth/user-not-found'){
        return setMsg('User Not Found')
      } else {
        return setMsg(errorCode)
      }
    });
    Navigate("/");
  }

  if (!!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <Box m="20px" className="login" sx={{ width: '25rem' }}>
      {error && <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
      <Alert severity='error'>Error Occurred, {msg}</Alert>
    </Stack>}
      <Header title="Login" subtitle="Login to get Access" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                
                variant="filled"
                type="text"
                label="Email ex: muhammed@gmail.com"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{display:'block'}}
              />
              <FormControl variant="filled" sx={{width: '100%', margin: '1rem 0'}}>
                <InputLabel htmlFor="filled-adornment-password">Password ex: 123456</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(event) => {
                            event.preventDefault();
                        }}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
            </Box>
            <Box display="flex" mt="10px">
              <Button type="submit" color="secondary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required")
});
const initialValues = {
  email: "",
  password: ''
};
export default Login