import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class EditClass extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            filiere:'',
            annee:'',
            err:''
        }
    }
    

    loadClass = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/classes/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    filiere:res.data.filiere,
                    annee:res.data.annee
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
    this.loadClass();
    
 }

    EditClass = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            filiere:this.state.filiere,
            annee:this.state.annee
        }
        axios.post('//localhost:5000/classes/update/'+this.props.match.params.id,cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeAnnee = (e) =>{
        this.setState({
            annee: e.target.value
        })
    }
    onChangeFiliere = (e) =>{
        this.setState({
            filiere: e.target.value
        })
    }
 

  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE EditClass PAGE !  </h1>


        
        <form style={{margin: '8%'}} onSubmit={this.EditClass} >
                    
                    <h1>Edit Class</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                    <div className="from-group">
                <label>Annee</label>
                    <input type="text" className="form-control" onChange={this.onChangeAnnee} value={this.state.annee} name="annee" id="annee" placeholder="annee" />
                    </div>
                    <div className="from-group">
                <label>Filiere</label>
                    <input type="text" className="form-control" onChange={this.onChangeFiliere} value={this.state.filiere} name="filiere" id="filiere" placeholder="filiere" />
                    </div>
                    <button className="btn btn-primary"  >Edit</button>
    
                </form>
        </div>
    );
  }
}

export default EditClass;
