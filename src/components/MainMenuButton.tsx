import React, { useState } from 'react';

import { Button, Grid, Theme } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';
import { EnhancedEncryption } from '@material-ui/icons';
import CardHeader from '../components/Card/CardHeader';
import Card from '../components/Card/Card';
import CardIcon from '../components/Card/CardIcon';
import CardBody from '../components/Card/CardBody';

export interface MainMenuBttunProps {

    title?: string;
    to?: string;
    [key: string]: any;
    Icon?: any;
    rest? : any;
}


var useStyle = makeStyles((theme: Theme) => createStyles({
    btn: {
        minHeight: 'inherit',
        fontSize: '20px',
        fontWeight: 500
    },
    card: {
        minHeight: '120px'
    }
}))

export const MainMenuButton: React.FC<MainMenuBttunProps> = ({ title, to, Icon, ...rest }) => {
    console.log('rest: ', rest);
   
    const classes = useStyle({});
    return (

       

            <Card className={classes.card}>
                <Button
                    variant='text'
                    {...rest}
                    onClick={rest.onClick}
 
                    component={Link}
                    to={to as string}
                    className={classes.btn}
                >
                    <CardHeader color="success" stats icon>
                        {
                            Icon && <CardIcon color="success">
                                <Icon />
                            </CardIcon>
                        }
                        {/* <Avatar src={s.Title} /> */}

                    </CardHeader>
                    <CardBody>

                        {title || rest.children}
                    </CardBody>
                </Button>
            </Card>


       

    )

}

