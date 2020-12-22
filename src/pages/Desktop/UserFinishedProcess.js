import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { HttpClient } from '../../infrastructure/HttpClient';
import UserManager from '../../infrastructure/userManager';
import { Typography } from '@material-ui/core';

const user = UserManager.Load();

const useStyles = makeStyles({
    noData: {
        margin: '20px',
        padding: '20px'
    },
    table: {
        minWidth: 650,
    },
    head: {

        background: "#d8d8d8"
    }
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function UserFinishedProcess() {
    const classes = useStyles();

    const [currentProcess, setUserProcess] = useState([]);


    useEffect(() => {


        var processes = [];
        HttpClient.Get(`${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest/history/process-instance?startedby=${user.username}&completed=1`).
            then(result => {

                result.map(r => {

                    const startDate = new Date(r.startTime).toLocaleString("fa-IR");
                    const endDate = new Date(r.endTime).toLocaleString("fa-IR");
                    const durationMilliSeconds = new Date(r.endTime ) - new Date(r.startTime);

                    const seconds = Math.round(durationMilliSeconds / 1000) ;
                    const minutes = seconds/ 60 ;
                    const hours = Math.round(minutes/ 60) ;
                    const days = Math.round(hours / 24) ;
                    var duration = "";
                    if (days === 0 && hours ===0){
                        duration = `${seconds} ثانیه`
                    }else
                    if (days === 0 ){
                        duration = `${hours} ساعت  `
                    }
                    else {
                        duration=  `${days} روز و ${hours} ساعت `

                    }
                    processes.push({
                        name: r.processDefinitionName,
                        start: startDate,
                        end: endDate,
                        duration: duration

                    })

                })
                setUserProcess(processes);

            })


    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell>نام فرایند</TableCell>
                        <TableCell>تاریخ شروع</TableCell>
                        <TableCell>تاریخ پایان</TableCell>
                        <TableCell align="left">مدت انجام فرایند</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentProcess.length == 0 ?
                            <TableRow className={classes.noData}>
                                <Typography variant='caption'>
                                    هیچ فرایندی برای شما ثبت نشده است.
                    </Typography>
                            </TableRow>
                            :
                            currentProcess.map((row) => {


                                return (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.start}</TableCell>
                                        <TableCell align="left">{row.end}</TableCell>
                                        <TableCell align="left">{row.duration}</TableCell>

                                    </TableRow>
                                )
                            }



                            )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
