import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { productTable } from "../../data/tableHead";
import { getData } from "../../shared/data";
import { tokens } from "../../theme";

const Products = () =>{
  const [ products, setProducts ] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const LinkToAdd = {
    textDecoration: 'none'
  }
  const columns = productTable;

  useEffect(()=>{
    getData("products").then(res => setProducts(res)) 
  },[])
  
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Link to='add-new-product' style={LinkToAdd}>
        <Box
            width="max-content"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px">
                <Typography
                  color={colors.grey[100]} sx={{ ml: "5px" }} 
                  width="100%"
                  padding='8px'
                  fontWeight= 'bold'
                  textTransform= 'capitalize'
                  display= 'flex'
                  gap= '8px'
                  >
                  add new Product
                </Typography>
              
        </Box>
      </Link>
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={products} columns={columns} />
      </Box>
    </Box>
  );
}

export default Products;