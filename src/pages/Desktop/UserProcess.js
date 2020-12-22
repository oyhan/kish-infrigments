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
    noData :{
      margin : '20px' ,
      padding : '20px' 
    },
    table: {
        minWidth: 650,
    },
    head : {

        background : "#d8d8d8"
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

export default function UserProcess() {
    const classes = useStyles();

    const [currentProcess, setUserProcess] = useState([]);


    useEffect(() => {


        var processes = [];
        HttpClient.Get(`${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest/process-instance?variables=initiator_eq_${user.username}`).
            then(result => {
                result.map(r => {

                    const url =
                        `${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest/process-instance/${r.id}/activity-instances`;
                    HttpClient.Get(url).then(activity => {

                        processes.push(activity);

                        setUserProcess(processes);

                    })

                })

            })

    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell>نام فرایند</TableCell>
                        <TableCell align="left">وضعیت جاری</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentProcess.length == 0 ?
                            <TableRow className={classes.noData}>
                                <Typography  variant='caption'>
                                    شما هیچ فرایندی در دست اقدام ندارید
                    </Typography>
                            </TableRow>
                            :
                            currentProcess.map((row) => {


                                return (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.childActivityInstances[0].name}</TableCell>

                                    </TableRow>
                                )
                            }



                            )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
