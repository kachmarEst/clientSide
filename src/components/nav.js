import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Nav extends React.Component {

    constructor(props){
        super(props);
      }

    clicked = () =>{
        localStorage.removeItem('_LsnPx');
        localStorage.clear();
    }

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">GABS</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                          <Link  className="nav-link" to="/">Dashboard <span className="sr-only">(current)</span></Link>
                        </li>
                     
                        <li className="nav-item">
                          <a onClick={this.clicked} className="nav-link" href="#">log out</a>
                        </li>                      
                    </ul>
                </div>
            </nav>
           
        );
    }
}

export default Nav;
