import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
class LoginAdmin extends React.Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          password:'',
          err:''
        }
      }
    
     
      onChangeUser= (e) =>{
        this.setState({
          username: e.target.value
        })
      }
      onChangePass= (e) =>{
        this.setState({
          password: e.target.value
        })
      }
      SignIn= (e) =>{
        e.preventDefault();
     const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json'
     }
     const cred = {
    username:this.state.username,
    password:this.state.password
     }
      axios.post('//localhost:5000/auth/admin',cred,{
        headers:headers})
      .then( res => {
        localStorage.setItem('_Gtx',res.data.token);
        this.props.history.push('/');
      })
      .catch( err => {
        this.setState({
          err:err.response.data.msg
        })
    
      });
        
        }

    render() {
 
        return (
          
                <form style={{margin: '8%'}} onSubmit={this.SignIn} >
                    
                    <h1>ADMIN LOGIN</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 
                    <div className="from-group">
                <label>Username</label>
                    <input type="text" className="form-control" onChange={this.onChangeUser} name="username" id="user" placeholder="username" />
                    </div>
                    <div className="from-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.onChangePass} name="password" id="pass" placeholder="password" />
                    </div>
                    <button className="btn btn-primary"  >Signin</button>
    
                </form>
           
        );
      }
}


export default LoginAdmin;
