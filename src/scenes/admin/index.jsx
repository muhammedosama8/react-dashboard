import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getData } from "../../shared/data";
import { Link } from "react-router-dom";

const AdminTeam = () => {
  const [ team, setTeam ] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const LinkToAdd = {
    textDecoration: 'none',
    display: "inline-block"
  }
  const deleteUserAndProfile = (id) => {
  }
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width="75%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              type === "admin"
                ? colors.greenAccent[600]
                : type === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {type === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {type === "manager" && <SecurityOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell:({row: { id }}) => {
        return(
          <Box className="actions">
            <Link className="toEdit" to={'/admin/'+id}>
              <CreateIcon sx={{color: colors.grey[100]}}/>
            </Link>

            <Button sx={{minWidth: "auto", zIndex: "9999"}} onClick={()=> deleteUserAndProfile(id)}>
              <DeleteIcon sx={{ color: "#c30000"}}/>
            </Button>
          </Box>
        )
      }
    }
  ];

  useEffect(()=>{
    getData("team").then(res => setTeam(res)) 
  },[])
  
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Link to='add-new-admin' style={LinkToAdd}>
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
                    <AdminPanelSettingsOutlinedIcon />
                  add new admin
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
        <DataGrid checkboxSelection rows={team} columns={columns} />
      </Box>
    </Box>
  );
};

export default AdminTeam;