import React, { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
  const sizesLabels = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
  const [sizes, setSizes] = useState([])
  const [selectedImage, setSelectedImage] = useState();
  const [open, setOpen] = useState(false);
  const productsCollection = collection(db, "products");
  const [category, setCategory] = useState('fashion');
  const storage = getStorage();
  
  const imageChange = (e) => {
    let file = e.target.files[0]
      setSelectedImage(file);

  };
  const handleCategory = (event) =>{
    setCategory(event.target.value);
  }
  const removeSelectedImage = () => {
    setSizes([])
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
        sizes: sizes,
        brand: e.brand,
        rating: 0,
        category
      }).then((res)=> setOpen(true)) 
      console.log('add')
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
  const handleSizes = (e) =>{
    setSizes([...sizes,e.target.value])
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
              <FormControl sx={{ gridColumn: "span 4" }}>
                <FormLabel>Sizes</FormLabel>
                <FormGroup aria-label="position" sx={{ gap: "25px" }} row>
                  {sizesLabels?.map((size) => (
                    <FormControlLabel
                    key={size}
                    value={size}
                    control={<Checkbox />}
                    sx={{ textTransform: 'uppercase'}}
                    label={size}
                    labelPlacement="end"
                    onChange={handleSizes}
                  />
                  ))}
                </FormGroup>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                multiline
                maxRows={4}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  required
                  value={category}
                  onChange={handleCategory }
                  name="category"
                >
                  <MenuItem value={'fashion'}>Fashion</MenuItem>
                  <MenuItem value={'electronic'}>Electronic</MenuItem>
                  <MenuItem value={"home"}>Home & Garden</MenuItem>
                  <MenuItem value={"gifts"}>Gifts</MenuItem>
                </Select>
              </FormControl>
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
                sx={{ gridColumn: "span 2" }}
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
            <Box display="flex" justifyContent="start" mt="20px" mb='50px'>
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