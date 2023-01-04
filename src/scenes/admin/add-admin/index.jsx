import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../shared/firebase-config";
import AlertSnackbar from "../../../components/Alert";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AddNewAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [type, setType] = useState('admin');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = async (e) =>{
    setOpen(false)
    const admin = {
      name: e.name,
      contact: e.contact,
      email: e.email,
      type,
      address: e.address
    }
    createUserWithEmailAndPassword(auth, e.email, e.password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: admin.name,
      }).then(() => {
      }).catch((error) => {
      });
      setDoc(doc(db, "team", user.uid), {
        id: user.uid,
        ...admin
      }).then(()=> setOpen(true)) 
    })
    
    console.log('add')
    resetForm(e)
  }
  const resetForm = (e) =>{
    e.name =''
    e.email = ''
    e.contact= ""
    e.address= ""
    e.password =''
  }
  const handleType= (event) =>{
    setType(event.target.value);
  }

  return (
    <Box m="20px">
      <Header title="CREATE New Admin" subtitle="Create a New Admin" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  required
                  value={type}
                  onChange={handleType }
                  name="category"
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'manager'}>Manager</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  onBlur={handleBlur}
                  label="Password"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <AlertSnackbar type='success' openAlert={open} msg={'Success Add Team Member'}/>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  password: yup.string().required("required")
});
const initialValues = {
  name: "",
  email: "",
  contact: "",
  address: "",
  password: ''
};

export default AddNewAdmin;
