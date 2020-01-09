import React from 'react';
import { Route, Redirect } from 'react-router-dom';




const ProfRoutee = ({component: Component, ...rest}) => {
    let lsnpx = localStorage.getItem('_LsnPx');
    let gtx = localStorage.getItem('_Gtx');

    return (
  // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            lsnpx ?
            <Redirect to="/" /> : gtx ? <Redirect to="/dashboard" /> 

             : <Component {...props} />
         )} />
    );
};

export default ProfRoutee;



