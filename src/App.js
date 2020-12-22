import React from 'react';
import './App.css';
import Login from './pages/login';
import "./typings/yup/yup.nationalCode"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import RegisterationSteps from './pages/App/RegisterNew';
import RTL from './infrastructure/Rtl';
import Desktop from './pages/Desktop/Desktop';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute';
import Layout from './pages/Layout/layout';


const theme = createMuiTheme({
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
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }
    }
  }
});



function App() {
  return (




    < RTL >
      <CssBaseline />
      <Router>
        <Layout>
          <Switch>

            <Route exact path="/">
              <Login />
            </Route>
            <PrivateRoute exact path="/home">
              <Desktop />
            </PrivateRoute>
            <PrivateRoute exact path="/new-fraud">
              <RegisterationSteps />
            </PrivateRoute>
          </Switch>
        </Layout>
      </Router>
      <ToastContainer rtl />
    </RTL >


  );
}

export default App;
