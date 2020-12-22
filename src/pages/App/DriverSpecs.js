import React from 'react';
import PersianDatePicker from './PersianDatePicker'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, makeStyles, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import DriverList from '../../components/SearchDriver/DriverList';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function DriverSpecs({ values, onChange, setFieldValue, formik, drivers }) {


  const classes = useStyles();


  const ondriverSelecte = (driver) => {

    if (driver == null) return;

    formik.setValues({
      ...formik.values,
      name: driver.driverName,
      lastName: driver.driverFamily,
      nationalCode: driver.driverNationalCode,
      vehicleOwnerType: driver.driverOwnerType,
      mobileNumber : driver.driverPhoneNumber
    })


  }




  return (
    <div className={classes.root} autoComplete="off">
      <div>
        {
          // formik.values.drivers.length >1 ? 
          <DriverList onSelect={ondriverSelecte} drivers={drivers} />
          // :

        }


        <TextField fullWidth helperText={formik.errors.name} error={formik.errors.name}
          margin='normal' id="outlined-basic" value={values.name} name="name" label="نام" variant="outlined" onChange={onChange} />


        <TextField helperText={formik.errors.lastName} error={formik.errors.lastName}
          margin='normal' id="outlined-basic" value={values.lastName} name="lastName" label="نام خانوادگی"
          variant="outlined" onChange={onChange} />


        <TextField helperText={formik.errors.nationalCode} error={formik.errors.nationalCode} margin='normal'
          id="outlined-basic" value={values.nationalCode}
          name="nationalCode" label="شماره ملی" variant="outlined" onChange={onChange} />


        <TextField helperText={formik.errors.mobileNumber} error={formik.errors.mobileNumber} margin='normal'
          id="outlined-basic" value={values.mobileNumber}
          name="mobileNumber" label="موبایل" variant="outlined" onChange={onChange} />




        <TextField helperText={formik.errors.drivingLicenseTypeNumber} error={formik.errors.drivingLicenseTypeNumber}
          margin='normal' id="drivingLicenseTypeNumber" value={values.drivingLicenseTypeNumber}
          name="drivingLicenseTypeNumber" label="شماره گواهی نامه" variant="outlined" onChange={onChange} />


        <FormControl error={formik.errors.vehicleOwnerType} component="fieldset">
          <FormLabel component="legend">نوع مالکیت </FormLabel>
          <RadioGroup row name="vehicleOwnerType" value={values.vehicleOwnerType} onChange={onChange}>
            <FormControlLabel value="شش دانگ" control={<Radio />} label="مالک شش دانگ" />
            <FormControlLabel value="سه دانگ" control={<Radio />} label="مالک سه دانگ" />
            <FormControlLabel value="کمکی" control={<Radio />} label="راننده کمکی" />

          </RadioGroup>
          <FormHelperText>{formik.errors.vehicleOwnerType}</FormHelperText>
        </FormControl>


      </div>
    </div>
  );
}
