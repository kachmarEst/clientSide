import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../components/navbar';

class Home extends React.Component {

    
  componentDidMount(){
    let gtx = localStorage.getItem('_Gtx');
   
    if(gtx){
        let headers={
            'x-auth-token':gtx
          }
      axios.get("//localhost:5000/auth/check",{
        headers:headers
      })
      .then(res=>{

        console.log(res);
     
    })
      .catch(
        err => {
            console.log(err);
          localStorage.removeItem('_Gtx');
          localStorage.clear();

        }
      );

    }
    
    
 }
  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE HOME PAGE !  </h1>
        <div> Choose on of the other pages :) </div>
        </div>
    );
  }
}

export default Home;
