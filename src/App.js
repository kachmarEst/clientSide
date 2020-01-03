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
import Home from './pages/home';
import PrivateRoute from './middleware/privateRoute';
import PrivateRoutee from './middleware/privateRoutee';
import UserList from './pages/userList';
import AddUser from './pages/addUser';
import EditUser from './pages/editUser';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
   
    }
  }

 


  render() {
    let gtx = localStorage.getItem('_Gtx');
console.log("het:"+gtx)
if(gtx){
  console.log('ah')
}
    return(


<Router>
<Switch>
  <PrivateRoute exact path="/" component={Home} />
  <PrivateRoute exact path="/users" component={UserList} />
  <PrivateRoute exact path="/user/:id" component={EditUser} />

  <PrivateRoute exact path="/users/add" component={AddUser} />

  <PrivateRoutee exact path="/login" component={LoginAdmin} />

</Switch>
</Router>


     
    );
  }
}


export default App;
