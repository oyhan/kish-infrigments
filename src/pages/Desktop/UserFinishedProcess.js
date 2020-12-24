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
import { IconButton, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const user = UserManager.Load();
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles({
    noData: {
        margin: '20px',
        padding: '20px'
    },
    table: {
        // minWidth: 650,
    },
    head: {

        background: "#d8d8d8"
    }
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



function Row({ row }) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow onClick={() => setOpen(!open)} className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell size='small' component="th" scope="row">
                    {row.vehicleType}
                </TableCell>
                <TableCell  size='small' align="left">{row.fraudDate}</TableCell>
                <TableCell  size='small' align="left">{row.driverFullname}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell  size='small' style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                تخلفات
                </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell size='small'  >کد تخلف</TableCell>
                                        <TableCell>مبلغ</TableCell>
                                        <TableCell >توضیحات</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.frauds.map((fraud, indx) => (
                                        <TableRow key={indx}>
                                            <TableCell component="th" scope="row">
                                                {fraud.fraudCode}
                                            </TableCell>
                                            <TableCell>{fraud.fraudCost}</TableCell>
                                            <TableCell >{fraud.fraudTitle}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function UserFinishedProcess({ pdid }) {
    const classes = useStyles();

    const [currentProcess, setUserProcess] = useState([]);


    useEffect(() => {


        var processes = [];
        HttpClient
            .Get(`${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest/history/variable-instance?variableName=RequesterModel&processDefinitionId=${pdid}`).
            then(result => {

                result.filter(f => f.value !== null).map(r => {
                    
                    const value = r.value;
                    const frauds = value.frauds.map(f => f.fraudCode).join();
                    const vehicleType = value.vehicleType;
                    const fraudDate = new Date(value.fraudDate).toLocaleDateString("fa-IR");
                    const durationMilliSeconds = new Date(r.endTime) - new Date(r.startTime);

                    const seconds = Math.round(durationMilliSeconds / 1000);
                    const minutes = seconds / 60;
                    const hours = Math.round(minutes / 60);
                    const days = Math.round(hours / 24);
                    var duration = "";
                    if (days === 0 && hours === 0) {
                        duration = `${seconds} ثانیه`
                    } else
                        if (days === 0) {
                            duration = `${hours} ساعت  `
                        }
                        else {
                            duration = `${days} روز و ${hours} ساعت `

                        }
                    processes.push({
                        vehicleType: value.vehicleType,
                        fraudDate: fraudDate,
                        driverFullname: `${value.name} ${value.lastName}`,
                        frauds: value.frauds,
                        fraudTime: value.fraudTime

                    })

                })
                setUserProcess(processes);

            })


    }, [])

    return (
        <TableContainer component={Paper}>
            <Table fixedHeader={false} style={{ tableLayout: 'auto' }} className={classes.table} aria-label="simple table">
                <TableHead  className={classes.head}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>خودرو</TableCell>
                        <TableCell>تاریخ </TableCell>
                        {/* <TableCell>زمان</TableCell> */}
                        <TableCell align="left">راننده</TableCell>
                        {/* <TableCell align="left">تخلفات ثبت شده</TableCell> */}

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
                                   <Row row={row} />
                                )
                            }



                            )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
