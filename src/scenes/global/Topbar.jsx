import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = getAuth()
  const colorMode = useContext(ColorModeContext);
  const {setCurrentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toAccount = () =>{
    navigate('/profile')
    handleClose()
  }
  const logout = () => {
    signOut(auth)
    setCurrentUser(null)
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <SettingsOutlinedIcon />
        </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={toAccount}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
