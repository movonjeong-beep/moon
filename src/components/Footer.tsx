import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'absolute',
        width: '1920px',
        height: '101px',
      }}
    >
      {/* Background Rectangle */}
      <Box
        sx={{
          position: 'absolute',
          width: '1920px',
          height: '100px',
          backgroundColor: '#0474BE',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      />

      {/* Frame 50 - Auto Layout Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 0,
          position: 'absolute',
          width: '1751px',
          height: '91px',
        }}
      >
        {/* Content goes here */}
      </Box>

      {/* Logo Image */}
      <Box
        component="img"
        src="/image.png"
        alt="Logo"
        sx={{
          position: 'absolute',
          width: '100px',
          height: '101px',
        }}
      />
    </Box>
  );
};

export default Footer;
