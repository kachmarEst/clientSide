import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            password:'',
            firstName:'',
            lastName:'',
            err:''
        }
    }
    

    loadUser = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/users/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    firstName:res.data.firstName,
                    lastName:res.data.lastName
                                });
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
            });

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
    this.loadUser();
    
 }

    EditUser = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            password:this.state.password
        }
        axios.post('//localhost:5000/users/update/'+this.props.match.params.id,cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/users');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeFN = (e) =>{
        this.setState({
            firstName: e.target.value
        })
    }
    onChangePass = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeLN = (e) =>{
        this.setState({
            lastName: e.target.value
        })
    }


  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE EditUser PAGE !  </h1>


        
        <form style={{margin: '8%'}} onSubmit={this.EditUser} >
                    
                    <h1>Edit User</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                    <div className="from-group">
                <label>firstName</label>
                    <input type="text" className="form-control" onChange={this.onChangeFN} value={this.state.firstName} name="firstname" id="firstname" placeholder="firstname" />
                    </div>
                    <div className="from-group">
                <label>lastName</label>
                    <input type="text" className="form-control" onChange={this.onChangeLN} value={this.state.lastName} name="lastname" id="user" placeholder="lastname" />
                    </div>
                    <div className="from-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.onChangePass}  name="password" id="pass" placeholder="password" />
                    </div>
                    <button className="btn btn-primary"  >Edit</button>
    
                </form>
        </div>
    );
  }
}

export default EditUser;
