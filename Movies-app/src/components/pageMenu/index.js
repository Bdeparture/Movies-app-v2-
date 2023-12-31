import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const PageMenuForPC = (props) => {

    const list = [
        {
          Movies: ['Popular', 'Upcoming', 'Top Rated'],
          People: ['Popular'],
        },
      ];
      
      const path = [
        {
          Movies: ['/movies', '/movies/upcoming', '/movies/toprate'],
          People: ['/people'],
        },
      ];
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (index) => {
    navigate(path[0][props.page][index]);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        {props.page}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {list[0][props.page].map((item, index) => (
          <MenuItem
            key={item}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PageMenuForPC;
