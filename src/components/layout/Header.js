import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AuthService from '../../services/AuthService'


import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const logOut = () => {
    AuthService.logOut()
    props.history.push('/')
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (URL) => {

    props.history.push(URL)

    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.name}
          </Typography>
          <div>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {!window.location.pathname.includes('/preferences') && <MenuItem onClick={() => handleMenuClick('/preferences')}>Preferences</MenuItem>}
              {window.location.pathname.includes('/preferences') && <MenuItem onClick={() => handleMenuClick('/dashboard')}>Dashboard</MenuItem>}
              <MenuItem onClick={logOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);