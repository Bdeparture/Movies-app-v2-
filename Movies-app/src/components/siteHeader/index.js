import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PageMenu from '../pageMenu';
import { useTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieIcon from '@mui/icons-material/Movie';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Account from "../account";

const pages = ['Movies', 'People'];
const pageRoutes = ['/movie', '/people'];

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  
  const navigate = useNavigate();
  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  return (
    <>
      <AppBar position="fixed" style={{backgroundColor:'black'}}>
        <Toolbar>
          <Typography sx={{ flexGrow: 0.1 }}>
          </Typography><MovieIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={open}
                  onClose={handleCloseMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}>
                  {pages.map((page, key) => {
                    let route = pageRoutes[key];
                    return (
                      <MenuItem key={page} onClick={handleCloseMenu}>
                        <Typography
                          textAlign="center"
                          component={Link}
                          to={route}
                          sx={{ textDecoration: 'none', color: 'black' }}>
                          {page}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
              <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                    key={"Home"}
                    color="inherit"
                    onClick={() => handleMenuSelect("/")}
                  >
                    Home
                  </Button>
              {pages.map((page) => (
                <PageMenu key={page} page={page}></PageMenu>
              ))}
            </Box>
          )}
           <Typography sx={{ flexGrow: 0.1 }}> <Account /></Typography>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};
export default SiteHeader;