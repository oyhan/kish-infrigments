import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchDriverInput from './SearchDriverInput';
import { HttpClient } from '../../infrastructure/HttpClient';
import { Grid, TextField, Typography } from '@material-ui/core';
import throttle from 'lodash/throttle';



export default function SearchDriver({onSelected}) {

    const [options, setOptions] = useState([]);

    const [inputValue, setInputValue] = React.useState('');



    const fetch = React.useMemo(
        () =>
          throttle((request, callback) => {
              
            HttpClient.Get(`${process.env.REACT_APP_TRACKER_ENDPOINT}/search?query=${request}`).then(result => {


                callback(result);
            }
    
            ).catch(error => {
    
    
            })
          }, 100),
        [],
      );

    useEffect(() => {

        let active = true;
        
        if (inputValue == '') return;
       
        fetch(inputValue , setOptions);

        return ()=> {
            active = false;
        }
    }, [inputValue])

    const onchange = (event , newValue)=>{
        onSelected(newValue);


    }
    return (
        <Autocomplete
            autoComplete
            onInputChange={(event, newInputValue) => {


                setInputValue(newInputValue);
            }}
            getOptionLabel={(item) => `${item.vehicleType},${item.color}`}
            // renderInput={(params) => <SearchDriverInput {...params} />}
            renderInput={(params) => <TextField fullWidth {...params} label="پلاک خودرو کد خودرو یا کد راننده..." variant="outlined" fullWidth />}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            onChange={onchange}
            renderOption={(option) => {
                var drivers = option.drivers;


                return (
                    <Grid container alignItems="center">

                        <Grid item xs>



                            <Typography variant="body2" color="textSecondary">
                            {option.plateNumber},{option.vehicleType},{option.color}
                            </Typography>
{/* 
                            {
                                drivers.map((d, index) => {

                                    return (
                                        <Typography variant="body2" color="textSecondary">
                                            {d.driverName} {d.driverFamily} , {d.driverNationalCode} , {d.driverPhoneNumber}
                                        </Typography>
                                    )
                                })
                            } */}
                        </Grid>
                    </Grid>
                );
            }}
        // }
        />
    )
}