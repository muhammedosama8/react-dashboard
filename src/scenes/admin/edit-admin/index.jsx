import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useState } from "react";
import AlertSnackbar from "../../../components/Alert";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../shared/firebase-config";

const EditAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  let { id } = useParams();
  const [type, setType] = useState();
  const [open, setOpen] = useState(false);
  const [ initialValues, setInitialValues ] = useState({})

  const getAdminInfo = async (id) =>{
    const adminInfo = await getDoc(doc(db, "team", id))
    const data = adminInfo.data()
    setInitialValues({
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address
    })
    setType(data.type)
  }
 
  useEffect(()=>{
    getAdminInfo(id)
  },[id])

  const handleFormSubmit = async (e) =>{
    setOpen(false)
    await updateDoc(doc(db, "team", id), {
      ...e,
      type: type
    }).then(()=>{
      console.log('Update')
      setOpen(true)
    })
  }

  return (
    <Box m="20px">
      <Header title="Edit Admin" subtitle="Edit Admin Information" />

      {initialValues?.name && <Formik
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
              
              <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value) }
                  name="type"
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'manager'}>Manager</MenuItem>
                </Select>
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
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik> }
      <AlertSnackbar type='success' openAlert={open} msg={'Success Update Admin'}/>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required")
});

export default EditAdmin;