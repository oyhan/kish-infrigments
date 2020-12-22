import React, { useState } from 'react';
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
import frauds from './FraudsItems';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    selected: {
        color: 'white',
        background: theme.palette.secondary.main

    },
    btn : {
        margin : '2.5px',
        width : '72px',
        height : '72px',
        fontSize:'24px',
        '&$selected' : {

            background: theme.palette.secondary.main
        }
        
    }

}));



export default function FraudList({ onSelect, formik }) {
    const classes = useStyles();

    const [selected, setSelected] = useState([]);

    const onClick = (fraud) => (event) => {
        const selectedList = [...selected,fraud];

        setSelected(selectedList);
        onFraudSelected(selectedList);
    }

    const onFraudSelected = (frauds) => {
        var date = new Date();
        if (frauds == null) return;
        formik.setValues({
            ...formik.values,
            // fraudCode: fraud.code,
            // fraudTitle: fraud.title,
            // fraudCost: fraud.amount,
            fraudDate : new Date().toDateString(),
            fraudTime : date.toLocaleTimeString('en-US'),
            frauds : frauds
        })


    }


    return (

        // <Grid container>
            //{/* <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group"> */}
                

                    frauds && frauds.map((d, index) => {

                        return (

                            <Button variant='outlined' key={index} 
                                className={classNames(classes.btn, selected.some(f=>f.fraudCode==d.fraudCode) && classes.selected  )}
                             onClick={onClick(d)}>{d.fraudCode}</Button>




                        )
                    })
                


        //     </ButtonGroup >

        // </Grid>

        // <List className={classes.root}>

        //     {
        //         frauds && frauds.map((d, index) => {

        //             return (
        //                 <ListItem key={index}
        //                 selected={selected.code==d.code}
        //                 button onClick={onClick(d)}>
        //                     <ListItemAvatar>
        //                         <Avatar>
        //                             <PersonPinCircleOutlined />
        //                         </Avatar>
        //                     </ListItemAvatar>
        //                     <ListItemText primary={`${d.code}`} secondary={d.title} />
        //                 </ListItem>
        //             )


        //         })
        //     }


        // </List>
    );
}
