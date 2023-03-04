import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import HomeIcon from '@mui/icons-material/Home';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Container>
    <Box sx={{ width: '100%'}}>
      <BottomNavigation 
        style={{ background: 'rgb(37, 61, 83)', borderRadius: '25px' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="home" value="/" icon={<HomeIcon />} LinkComponent={Link} to={'/'}/>
        <BottomNavigationAction label="Gallery" value="/myphotos" icon={<CameraRollIcon />} LinkComponent={Link} to={'/myphotos'}/>
        <BottomNavigationAction label="Photodump" value="photodump" icon={<DriveFolderUploadIcon/>} LinkComponent={Link} to={'/photodump'}/>
        <BottomNavigationAction label="Contact" value="contact" icon={<ContactMailIcon/>} LinkComponent={Link} to={'/contact'}/>
      </BottomNavigation>
    </Box>
    </Container>
  );
}