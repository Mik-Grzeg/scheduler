import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, Redirect } from 'react-router-dom'

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

export default function TopApp(props) {
    const classes = useStyles();
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
    const date = new Date()

    const day = days[date.getDay()];
    const month = date.getMonth()+1;

    const redirect = () => {
      return 
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            {day}, {date.getDate()}.{month} 
            </Typography>
            <Link to='/instructor'>
            <IconButton aria-label='profile page' color='inherit' >
              {props.isAuthenticated ? <AccountCircleIcon></AccountCircleIcon> : null}
            </IconButton>
            </Link>

            {props.isAuthenticated ? <Button color="inherit" onClick={()=>props.logout()}>Logout</Button> : null}
            </Toolbar>
        </AppBar>
        </div>
    );
}