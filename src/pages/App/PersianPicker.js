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

function PersianPicker({ type, ...props }) {
  
  const [selectedDate, handleDateChange] = useState(moment());
  const handleChange = (date) => {
    
    
    if (type == 'time') {
      props.onChange(props.name, date && date.format("hh:mm A"));
    } else
      props.onChange(props.name, date && date.format("YYYY:MM:DD"));
    handleDateChange(date);
  }
  if (type == 'time')
    return (
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <TimePicker
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
          ampm={false}
          // clearable
          // okLabel="تأیید"
          // cancelLabel="لغو"
          // clearLabel="پاک کردن"
          // {...props}
          labelFunc={date => (date ? date.format("hh:mm A") : "")}
          onChange={handleChange}
          value={selectedDate}
        />


      </MuiPickersUtilsProvider>
    )
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

export default PersianPicker;
