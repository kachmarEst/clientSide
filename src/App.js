import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './Logins/loginAdmin';
import axios from 'axios';
import Navbar from './components/navbar';
import Home from './pages/admin/home';
import PrivateRoute from './middleware/privateRoute';
import PrivateRoutee from './middleware/privateRoutee';
import UserList from './pages/admin/userList';
import AddUser from './pages/admin/addUser';
import EditUser from './pages/admin/editUser';
import EditClass from './pages/admin/editClass';
import AddProf from './pages/admin/addProf';
import ProfList from './pages/admin/profList';
import EditProf from './pages/admin/editProf';
import ElementList from './pages/admin/ElementList';
import AddElement from './pages/admin/addElement';
import EditElement from './pages/admin/editElement';
import AddStudent from './pages/admin/addStudent';
import StudentList from './pages/admin/studentList';
import EditStudent from './pages/admin/editStudent';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
   
    }
  }

 


  render() {

    return(


<Router>
<Switch>
  <PrivateRoute exact path="/" component={Home} />
  <PrivateRoute exact path="/users" component={UserList} />
  <PrivateRoute exact path="/profs" component={ProfList} />
  <PrivateRoute exact path="/students" component={StudentList} />
  <PrivateRoute exact path="/elements" component={ElementList} />
  <PrivateRoute exact path="/user/:id" component={EditUser} />
  <PrivateRoute exact path="/prof/:id" component={EditProf} />
  <PrivateRoute exact path="/element/:id" component={EditElement} />
  <PrivateRoute exact path="/class/:id" component={EditClass} />
  <PrivateRoute exact path="/student/:id" component={EditStudent} />
  <PrivateRoute exact path="/users/add" component={AddUser} />
  <PrivateRoute exact path="/profs/add" component={AddProf} />
  <PrivateRoute exact path="/students/add" component={AddStudent} />
  <PrivateRoute exact path="/elements/add" component={AddElement} />

  <PrivateRoutee exact path="/login" component={LoginAdmin} />

</Switch>
</Router>


     
    );
  }
}


export default App;
