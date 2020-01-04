import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class AddProf extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:'',
            lastName:'',
            firstName:'',
            cin:'',
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

    AddProf = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            username:this.state.username,
            email:this.state.email,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            cin:this.state.cin,

            password:this.state.password
        }
        axios.post('//localhost:5000/profs/add',cred,{
            headers:headers
        })
        .then(
            res =>{
                this.props.history.push('/profs');

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
    onChangeFN = (e) =>{
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLN = (e) =>{
        this.setState({
            lastName: e.target.value
        })
    }
    onChangeCIN = (e) =>{
        this.setState({
            cin: e.target.value
        })
    }

  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE AddProf PAGE !  </h1>


        
        <form style={{margin: '8%'}} onSubmit={this.AddProf} >
                    
                    <h1>Add User</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 

                    <div className="from-group">
                <label>FirstName</label>
                    <input type="text" className="form-control" onChange={this.onChangeFN} name="firstName" id="firstName" placeholder="firstName" />
                    </div>
                    <div className="from-group">
                <label>LastName</label>
                    <input type="text" className="form-control" onChange={this.onChangeLN} name="lastName" id="lastName" placeholder="lastName" />
                    </div>
                    <div className="from-group">
                <label>CIN</label>
                    <input type="text" className="form-control" onChange={this.onChangeCIN} name="cin" id="cin" placeholder="cin" />
                    </div>
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

export default AddProf;
