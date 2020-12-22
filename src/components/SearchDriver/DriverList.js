import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { PersonPinCircleOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function DriverList({drivers , onSelect}) {
    const classes = useStyles();


    const onClick =(driver)=>(event)=>{
        
        onSelect(driver); 
    }


    return (
        <List className={classes.root}>

            {
                drivers && drivers.map((d, index) => {

                    return (
                        <ListItem button  onClick={onClick(d)}>
                            <ListItemAvatar>
                                <Avatar>
                                    {d.image ? 
                                     <Avatar alt="d.driverName" src={d.image} />
                                    :
                                    <PersonPinCircleOutlined />

                                    }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${d.driverName},${d.driverFamily}`} secondary={d.driverNationalCode} />
                        </ListItem>
                    )


                })
            }

           
        </List>
    );
}
