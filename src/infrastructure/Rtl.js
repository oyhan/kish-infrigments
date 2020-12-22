import React from 'react'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
let theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '*::-webkit-scrollbar': {
              width: '0.4em'
            },
            '*::-webkit-scrollbar-track': {
              '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'orange',
              outline: '1px solid slategrey'
            }
          }
        }
      },
    palette: {
        text: {
            primary: '#424242'


        },
        primary: {
            dark: '#005b4f',
            light: '#4ebaaa',
            main: '#00897b',


        },
        secondary: {
            dark: '#883997',
            light: '#ee98fb',
            main: '#ba68c8'
        }
    },
    direction: 'rtl',
    typography: {
        fontFamily: [
            'IranSans',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    }
});
export default function RTL(props) {



    return (
        <StylesProvider jss={jss}>
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    {props.children}
                </div>
            </MuiThemeProvider>

        </StylesProvider>
    );
}