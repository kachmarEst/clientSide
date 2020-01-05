import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Navbar extends React.Component {

    constructor(props){
        super(props);
      }

    clicked = () =>{
        localStorage.removeItem('_Gtx');
        localStorage.clear();
    }

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Blog</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                          <Link  className="nav-link" to="/">ClassList <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                          <Link  className="nav-link" to="/users">UserList</Link>
                        </li>
                        <li className="nav-item">
                          <Link  className="nav-link" to="/users/add">AddUser</Link>
                        </li>
                       
                        <li className="nav-item">
                          <Link  className="nav-link" to="/profs">ProfList</Link>
                        </li>
                        <li className="nav-item">
                          <Link  className="nav-link" to="/profs/add">AddProf</Link>
                        </li>
                        <li className="nav-item">
                          <Link  className="nav-link" to="/elements">ElementList</Link>
                        </li>
                        <li className="nav-item">
                          <Link  className="nav-link" to="/elements/add">AddElement</Link>
                        </li>
                        <li className="nav-item">
                          <Link  className="nav-link" to="/students">StudentList</Link>
                        </li>
                        
                        <li className="nav-item">
                          <Link  className="nav-link" to="/students/add">AddStudent</Link>
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

export default Navbar;
