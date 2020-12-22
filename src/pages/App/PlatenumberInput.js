import MaskedInput from 'react-text-mask';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';



function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
           
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['ایران', /[1-9]/, /\d/, /\d/, ')', ' ',  /\d/, /\d/, '-', /\d/, /\d/, /\d/ ]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}


export default function PlatenumberInput(props) {


    return (
        <FormControl variant='outlined'>
            <InputLabel htmlFor="formatted-text-mask-input">{props.label}</InputLabel>
            <Input
            va
                id='formatted-text-mask-input'
                {...props}
                
                inputComponent={TextMaskCustom}
            />
        </FormControl>
    )
}