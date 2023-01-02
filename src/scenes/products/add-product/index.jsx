import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection} from "firebase/firestore";
import { db } from "../../../shared/firebase-config";
import { v4 as uuidv4 } from 'uuid';
import AlertSnackbar from "../../../components/Alert";

const AddNewProduct = () =>{
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImage, setSelectedImage] = useState();
  const [open, setOpen] = useState(false);
  const productsCollection = collection(db, "products");
  const storage = getStorage();
  
  const imageChange = (e) => {
    let file = e.target.files[0]
      setSelectedImage(file);

  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };

    const handleFormSubmit = async (e) =>{
      setOpen(false)
      let id = uuidv4()
      const storageRef = ref(storage, selectedImage.name);
      const upload = await uploadBytes(storageRef, selectedImage)
      const snapshot = await getDownloadURL(upload.ref)
      addDoc(productsCollection, {
        id,
        name: e.name,
        price: e.price,
        quantity: e.quantity,
        img: snapshot,
        description: e.description,
        brand: e.brand,
        rating: 0
      }).then((res)=> setOpen(true)) 

      resetForm(e)
    }
    const resetForm = (e) =>{
      e.name =''
      e.price = ''
      e.quantity= ""
      e.description= ""
      e.brand= ""
      e.img= ""
      removeSelectedImage()
    }
    return(
        <Box m="20px">
        <Header title="CREATE PRODUCT" subtitle="Create a New Product" />
        
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
                label="Product Name"
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
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Brand"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name="brand"
                error={!!touched.brand && !!errors.brand}
                helperText={touched.brand && errors.brand}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                onBlur={handleBlur}
                onChange={imageChange}
                required
                name="img"
                error={!!touched.img && !!errors.img}
                helperText={touched.img && errors.img}
                sx={{ gridColumn: "span 4" }}
              />
              {selectedImage && (
                <div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Thumb"
                    className="product-img"
                  />
                  <button onClick={removeSelectedImage} className='deleteImg'>
                    Remove This Image
                  </button>
                </div>
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" mb='50px'>
              <Button type="submit" color="secondary" variant="contained">
                Add
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <AlertSnackbar type='success' openAlert={open} msg={'Success Add Product'}/>
        </Box>
    )
}
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  price: yup.number().required("required"),
  quantity: yup.number().required("required"),
  brand: yup.string().required("required"),
  description: yup.string().required("required"),
  img: yup.string()
});
let initialValues = {
  name: "",
  price: "",
  quantity: "",
  description: "",
  brand: "",
  img: ""
};
export default AddNewProduct;