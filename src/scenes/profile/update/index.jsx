import { Box, Button, TextField } from "@mui/material";
import { Formik  } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { getAuth, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase-config";
import AlertSnackbar from "../../../components/Alert";

const UpdateProfile = () => {
  const [ initialValues, setInitialValues ] = useState({})
  const [open, setOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const auth = getAuth();
  const isNonMobile = useMediaQuery("(min-width:600px)");
 
  const getProfileInfo = async (id) =>{
    const adminInfo = await getDoc(doc(db, "team", id))
    const data = adminInfo.data()
    setInitialValues({
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address
    })
  }

  useEffect(()=>{
    getProfileInfo(currentUser.uid)
  },[currentUser.uid])

  const handleFormSubmit = async (values) => {
    setOpen(false)
    await updateDoc(doc(db, "team", currentUser.uid), {
      ...values,
    }).then(()=>{
      setOpen(true)
    })
    await updateProfile(auth.currentUser, {
      displayName: values.name,
      email: values.email,
      phoneNumber: values.contact
    }).then(() => {
      console.log(currentUser)
    }).catch((error) => {
      console.log(error.message)
    });
  };

  return (
    <Box m="20px">
      <Header title="Update Profile" subtitle="Update Profile" />

      {initialValues?.name && <Formik
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
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                name="address"
                value={values.address}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>}
      <AlertSnackbar type='success' openAlert={open} msg={'Success Update Profile'}/>
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
    .matches(phoneRegExp, "Phone number is not valid"),
  address: yup.string()
});

export default UpdateProfile;
