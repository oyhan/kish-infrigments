import React from 'react';
import { AppBar, Button, Container, Divider, Grid, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppToolBar from './AppToolBar';
import UserManager from '../../infrastructure/userManager';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '50px',
        marginTop: '50px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Layout(props) {
    const classes = useStyles();

    return (

        <React.Fragment>
            {UserManager.IsAuthenticated() ? <AppToolBar /> : ""}

            {/* <div className={classes.root}>
                <AppBar position='sticky'>
                    <Toolbar>
                        <Button
                            component={Link}
                            to={'/home'}
                        >
                            <Typography>
                                صحفحه اصلی
                        </Typography>
                        </Button>

                        <Typography className={classes.title}>
                            asdasd
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div> */}


            <Container  >
                <Grid container justify='center'
                    spacing={1}>
                    {/* <Paper className={UserManager.IsAuthenticated() ? classes.root : ""}> */}

                        {props.children}

                    {/* </Paper> */}

                </Grid>

            </Container>
        </React.Fragment>

    )
}