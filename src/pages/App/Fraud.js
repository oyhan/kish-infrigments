


import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, makeStyles, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import React from 'react';
import FraudList from '../../components/Fraud/FraudList';
import SearchDriver from '../../components/SearchDriver/SearchDriver';
import DriverSpecs from './DriverSpecs';
import PersianDatePicker from './PersianDatePicker';
import PersianPicker from './PersianPicker';
import PlatenumberInput from './PlatenumberInput';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',

        },
        margin: '25px',
    },
}));



export default function Fraud({ values, onChange, formik, setDrivers }) {


    const classes = useStyles();



    const onFraudSelected = (fraud) => {
        if (fraud == null) return;
        formik.setValues({
            ...formik.values,
            fraudCode: fraud.code,
            fraudTitle: fraud.title,
            fraudCost : fraud.amount,
          
        })


    }


    return (

        <div className={classes.root}>



            

          
                

            <TextField helperText={formik.errors.fraudOrigin} error={formik.errors.fraudOrigin}
                margin='normal' id="outlined-basic" value={values.fraudOrigin}
                name="fraudOrigin" label="مبدا"
                variant="outlined" onChange={onChange} />

            <TextField helperText={formik.errors.fraudDest} error={formik.errors.fraudDest}
                id="outlined-basic" value={values.fraudDest} name="fraudDest" label="مقصد"
                variant="outlined" onChange={onChange} />

            <PersianDatePicker helperText={formik.errors.fraudDate} error={formik.errors.fraudDate}
                label="تاریخ" name="fraudDate" value={values.fraudDate} onChange={formik.setFieldValue} />

            <PersianPicker type='time' helperText={formik.errors.fraudTime} error={formik.errors.fraudTime}
                label="زمان تخلف" name="fraudTime" value={values.fraudTime} onChange={formik.setFieldValue} />


            {/* <TextField helperText={formik.errors.fraudTime} error={formik.errors.fraudTime}
                id="outlined-basic" value={values.fraudTime} name="fraudTime" label="زمان تخلف"
                variant="outlined" onChange={onChange} /> */}





        </div>
    )
}

