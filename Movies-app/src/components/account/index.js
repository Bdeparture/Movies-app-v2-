import React, { useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";

const Account = () => {
  const { isAuthenticated, userName } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src="/broken-image.jpg" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem>
              <Avatar /> {userName}
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to="/movies/favorites">
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              My Favorite
            </MenuItem>
            <MenuItem component={Link} to="/login">
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem component={Link} to="/login">
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Account;