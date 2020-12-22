import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserManager from '../../infrastructure/userManager';
const user = UserManager.Load();


var displayName = "";

if (user && user.firstName && user.lastName) {
    displayName =  `${user.firstName} ${user.lastName}`
}
else if(!user) {
    displayName = "";
}
else displayName = user.username;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function AppToolBar() {
  const classes = useStyles();


  const logout = ()=>{
    UserManager.Save(null);
    window.location = "/";

  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            میز کار
          </Typography>
          <Typography  >
            {displayName}
          </Typography>

           <Button onClick={logout} color="inherit">خروج</Button>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
