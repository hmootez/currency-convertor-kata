import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <AppBar sx={{ bgcolor: "#029597", height: 83 }}>
        <Toolbar>
          <img src="logo-ca.png" width={130} height={80} alt="alt"></img>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid size={{ xs: 11, md: 10 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  marginTop: 2,
                }}
              >
                Mootez Hichri / Convertisseur de devise
              </Typography>
            </Grid>
            <Grid size={{ xs: 1, md: 1 }}>
              <IconButton>
                <Avatar alt="Remy Sharp" src="mtz-logo.webp" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
