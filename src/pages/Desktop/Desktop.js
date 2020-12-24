import React, { useEffect, useState } from 'react';
import UserManager from '../../infrastructure/userManager';
import CamSDK from 'camunda-bpm-sdk-js'
import { Base64 } from 'js-base64';
import { MainMenuButton } from '../../components/MainMenuButton';
import UserProcess from './UserProcess'
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { S_IFBLK } from 'constants';
import UserFinishedProcess from './UserFinishedProcess';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
var _ = require('lodash');


const desktopStyles = makeStyles((theme)=>({

    
  desktopBackground : {
     background: 'red'
  }
}))

export default function Desktop() {

    const [proc, setproc] = useState([]);
    useEffect(() => {

        var user = UserManager.Load();
        var camClient = new CamSDK.Client({
            mock: true,
            apiUri: `${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest`,
            headers: {
                // Authorization: `Basic ${Base64.toBase64(`${user.username}:${user.password}`)}`,
                Authorization: `Basic ${Base64.toBase64(`demo:demo`)}`,
            }
        });
        var procService = new camClient.resource('process-definition');

        procService.list({}, function (err, results) {


            const items = _.groupBy(results.items.filter(d => d.key == 'Infringment.New'), r => r.key)
            const grouped = Object.entries(items).map(([key, value]) => {
                return _.orderBy(value, ['version'], ['desc'])[0];
            })


            setproc(grouped)

        });

    }, [])

    const onclick = id => event => {




        localStorage.setItem("pdid", id);
    }

    return (

        <div className>


            {/* <Grid xs={12} md={4} item> <MainMenuButton to="new-fraud" title="ثبت تخلف" />
            </Grid> */}

            {
                proc.map((p, i) => {

                    return <MainMenuButton key={i} to="new-fraud" onClick={onclick(p.id)} title="ثبت تخلف" />
                })
            }

            {/* <Typography  variant='h6' >
                فرایند های در دست اجرا برای شما
                </Typography>
                <Divider />
            <Grid alignContent='flex-start' item>

                <UserProcess />

            </Grid>*/}

            <Typography variant='h6' >
                تخلفات ثبت شده
                </Typography>
            <Divider />
            <Grid alignContent='flex-start' xs={12} item>

                <UserFinishedProcess pdid={localStorage.getItem("pdid")}/>

            </Grid>
        </div>

    )
}

