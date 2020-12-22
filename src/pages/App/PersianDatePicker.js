import moment from "moment";
import jMoment from "moment-jalaali";
import React, { useState } from "react";
import JalaliUtils from "@date-io/jalaali";
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function PersianDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(moment());
  const handleChange = (date)=> {
      
     
      props.onChange(props.name, date && date._d.toDateString());

    handleDateChange(date);
  }
  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <KeyboardDatePicker 
      //  orientation="landscape"
       autoOk
       error={props.error}
       helperText={props.helperText}
       label={props.label}
       inputVariant='outlined'
      //  views={['year','month' , 'dates']}
       InputAdornmentProps={{ position: "end" }}
       variant="inline"
        name={props.name}
        // clearable
        // okLabel="تأیید"
        // cancelLabel="لغو"
        // clearLabel="پاک کردن"
        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
        // {...props}
        onChange={handleChange}
        value={selectedDate}
      />

     
    </MuiPickersUtilsProvider>
  );
}

export default PersianDatePicker;
