import { Avatar, Box, Card, CardContent, Fab, Stack, Typography } from "@mui/material"
import Header from "../../components/Header";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import person from "../../assets/indes";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useEffect } from "react";

const Profile = () => {
    const [ user, setUser] = useState({})
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {currentUser} = useContext(AuthContext)
    
    useEffect(()=>{
        setUser(currentUser.providerData[0])
    },[currentUser])
    return(
        <Box m="20px">
            <Header title="Profile" subtitle="Profile Information" />

            <Stack direction="row" style={{justifyContent: 'space-between', marginBottom: '2.5rem'}}>
                <Avatar
                    alt="Remy Sharp"
                    src={person}
                    sx={{ width: 80, height: 80, background: '#aeaeae', padding: '12px' }}
                />
                <Link to='/profile/edit' style={{margin: 'auto 0'}} >
                    <Fab color="secondary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Link>
            </Stack>
            <Card sx={{ background: colors.primary[400],}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '0 0 1rem 0'}}>
                        <DriveFileRenameOutlineIcon style={{marginRight: '12px', color: colors.grey[300]}}/>
                        {user.displayName}
                    </Typography>
                    <Typography variant="h4" style={{margin: '1rem 0'}}>
                        <EmailIcon style={{marginRight: '12px', color: colors.grey[300]}}/>
                        {user.email}
                    </Typography>
                    <Typography variant="h4" style={{margin: '1rem 0'}}>
                        <LocationOnIcon style={{marginRight: '12px', color: colors.grey[300]}}/>
                        Cairo
                    </Typography>
                    <Typography variant="h4" style={{margin: '1rem 0 0 0'}}>
                        <PhoneIcon style={{marginRight: '12px', color: colors.grey[300]}}/>
                        01002233445
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
export default Profile;