import React from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import {logout} from "../redux/apiCalls";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0].toUpperCase()}${name.split(' ').length===1?name[1].toUpperCase():name.split(' ')[1][0].toUpperCase()}`,
    };
  }

function ProfileDropdown() {
  const username = useSelector((state) => state.user.currentUser.username);
  const userid = useSelector((state) => state.user.currentUser._id);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleLogOut = () => {
    logout(dispatch);
  };

  return (
    <div>
      <Avatar onClick={handleMenuOpen} {...stringAvatar(username)} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* <Link to={`/Profile/${userid}`}><MenuItem onClick={handleMenuClose}>View Profile</MenuItem></Link> */}
        <Link to={`/Profile/accountsettings`}><MenuItem onClick={handleMenuClose}>View Profile</MenuItem></Link>
        <Link to={`/Settings/${userid}`}><MenuItem onClick={handleMenuClose}>Settings</MenuItem></Link>
        <Link to="/"><MenuItem onClick={handleLogOut}>Logout</MenuItem></Link>
      </Menu>
    </div>
  );
}

// // Usage:
// function App() {
//   return (
//     <div>
//       {/* Your other components */}
//       <ProfileDropdown />
//     </div>
//   );
// }

export default ProfileDropdown;