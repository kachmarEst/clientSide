
import React from 'react';
import { Route, Redirect } from 'react-router-dom';




const PrivateRoutee = ({component: Component, ...rest}) => {
    let gtx = localStorage.getItem('_Gtx');
    let lsnpx = localStorage.getItem('_LsnPx');

    return (
  // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           gtx ?
           <Redirect to="/dashboard" /> :
           lsnpx ? <Redirect to="/" /> 
            : <Component {...props} />
        )} />
    );
};

export default PrivateRoutee;



