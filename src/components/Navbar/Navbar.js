import { AppBar, IconButton, Toolbar, Typography,Box,Button } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss'
import MenuIcon from '@mui/icons-material/Menu';




function Navbar(){
    let userId =1;
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" className="navbar-header-link" >
                <Link className="navbar-link " to="/">HOME</Link>
            </Typography>
            <Button color="inherit">
                <Link className="navbar-link" to={{pathname:"/users/"+userId}}> User</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Navbar;