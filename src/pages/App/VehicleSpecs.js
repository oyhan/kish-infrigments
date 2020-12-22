import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, makeStyles, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import React from 'react';
import SearchDriver from '../../components/SearchDriver/SearchDriver';
import DriverSpecs from './DriverSpecs';
import PlatenumberInput from './PlatenumberInput';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
           
        },
        margin : '25px',
    },
}));



export default function VehicleSpecs({ values, onChange ,formik , setDrivers}) {


    const classes = useStyles();


    
    const onVehicleSelected = (vehicle)=> {
        if (vehicle==null) return;
        formik.setValues({
            ...formik.values,
            plateNumber : vehicle.plateNumber,
            vehicleCode  : vehicle.vehicleCode,
            vehicleType  : `${vehicle.vehicleType},${vehicle.color}`,
                 
        })
        setDrivers(vehicle.drivers)
        

    }

    const vehicleYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]

    return (

        <div className={classes.root}>


            <SearchDriver onSelected={onVehicleSelected} />

           
            <TextField helperText={formik.errors.vehicleType} error={formik.errors.vehicleType}
              margin='normal' id="outlined-basic" value={values.vehicleType} name="vehicleType" label="نوع خودرو" 
              variant="outlined" onChange={onChange} />


            <TextField helperText={formik.errors.plateNumber} error={formik.errors.plateNumber}
              margin='normal' id="outlined-basic" value={values.plateNumber} name="plateNumber" label="شماره پلاک" 
              variant="outlined" onChange={onChange} />
            
            <TextField helperText={formik.errors.vehicleCode} error={formik.errors.vehicleCode} 
            id="outlined-basic" value={values.vehicleCode} name="vehicleCode" label="کد خودرو" variant="outlined" onChange={onChange} />

       



            

           

           



        </div>
    )
}