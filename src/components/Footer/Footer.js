import React from 'react';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const footerStyles = {
    backgroundColor: '#555',
    textAlign: 'center',
    color: '#fefefe',
    padding: '0.5rem',
    lineHeight: '1rem',
  };

  return (
    <Typography sx={footerStyles} component="footer">
      &copy; All rights reserved to Booking App {new Date().getFullYear()}
    </Typography>
  );
};

export default Footer;
