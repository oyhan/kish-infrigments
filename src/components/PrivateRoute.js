import  React from 'react';
import {Link,BrouserRouter as Router,Route , Redirect} from 'react-router-dom';
import UserManager from '../infrastructure/userManager';



export default function PrivateRoute (props) {


    const user = UserManager.Load();
    if (user)
      return (

        <Route {...props} path={props.path} >
            {props.children} 
        </Route>
      )
      else return (
          <Redirect to="/" />
      )

    
}








