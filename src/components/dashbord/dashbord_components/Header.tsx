import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { Directions } from '@mui/icons-material';





const Header = ({ title, subTitle, isDashboard = false }) => {
  const theme = useTheme();
  return (
    <Box mb={isDashboard ? 2 : 4} style={{direction:"ltr"}} >
      <Typography
        sx={{
          color: theme.palette.info.light,
          fontWeight: "bold",
        }}
        variant="h5"
      >
        {title}
      </Typography>
      <Typography variant="body1">{subTitle}</Typography>
    </Box>


  );
}

export default Header;
