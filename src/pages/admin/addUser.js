import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class AddUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:'',
            err:''
        }
    }
    
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

    AddUser = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('//localhost:5000/users/add',cred,{
            headers:headers
        })
        .then(
            res =>{
                this.props.history.push('/users');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeEmail = (e) =>{
        this.setState({
            email: e.target.value
        })
    }
    onChangePass = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeUser = (e) =>{
        this.setState({
            username: e.target.value
        })
    }


  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE AddUser PAGE !  </h1>


        
        <form style={{margin: '8%'}} onSubmit={this.AddUser} >
                    
                    <h1>Add User</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                    <div className="from-group">
                <label>Email</label>
                    <input type="email" className="form-control" onChange={this.onChangeEmail} name="email" id="email" placeholder="email" />
                    </div>
                    <div className="from-group">
                <label>Username</label>
                    <input type="text" className="form-control" onChange={this.onChangeUser} name="username" id="user" placeholder="username" />
                    </div>
                    <div className="from-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.onChangePass} name="password" id="pass" placeholder="password" />
                    </div>
                    <button className="btn btn-primary"  >Add</button>
    
                </form>
        </div>
    );
  }
}

export default AddUser;
