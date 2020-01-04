import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Home extends React.Component {

  constructor(props){
    super(props);
    this.state ={
        filiere:'',
        annee:'',
        err:'',
        classes:[]
    }
}


loadClasses = () =>{
  const headers = {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'x-auth-token':localStorage.getItem('_Gtx')
       } 

      axios.get('//localhost:5000/classes',{headers:headers})
      .then(res =>{
          this.setState({classes:res.data});
          console.log(res.data)
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
    this.loadClasses();
    
 }



 AddClass = (e) =>{
  e.preventDefault();
  const headers = {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'x-auth-token':localStorage.getItem('_Gtx')
       } 
  const cred = {
      filiere:this.state.filiere,
      annee:this.state.annee  }
  axios.post('//localhost:5000/classes/add',cred,{
      headers:headers
  })
  .then(
      res =>{
        this.loadClasses();
      }
  )
  .catch(error =>{
      this.setState({
          err:error.response.data.msg
      })
  });


}

onChangeFiliere = (e) =>{
  this.setState({
      filiere: e.target.value
  })
}

onChangeAnnee = (e) =>{
  this.setState({
      annee: e.target.value
  })
}

clicked = (id)=>{
  const headers = {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'x-auth-token':localStorage.getItem('_Gtx')
       } 
       axios.delete('//localhost:5000/classes/'+id,{headers:headers})
       .then(res =>{
           console.log(res.data.msg)
           this.loadClasses();
      })
       .catch(error =>{
         console.log(error);
          this.setState({err:error.response.data.msg});
       });

}

mappingUsers = () =>{
  return this.state.classes.map((item) =>
 <tr >
   <td>{item.filiere}</td>
  <td>{item.annee}</td>
  <td>{item.createdAt}</td>
  <td><Link className="btn btn-warning" to={"/class/"+item._id} >Edit</Link></td>
  <td><button onClick={() => this.clicked(item._id)} className="btn btn-danger">Delete</button></td>
</tr>
    )
}

  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> Filiere List  </h1>


        <table style={{margin: '1%'}} class="table">
  <thead class="thead-dark">
    <tr>

      <th scope="col">Filiere</th>
      <th scope="col">Annee</th>
      <th scope="col">created_at</th>
      <th colSpan="2">actions</th>


    </tr>
  </thead>
  <tbody>
   
  {this.mappingUsers()}
  </tbody>
</table>


        <form class="form-inline"  onSubmit={this.AddClass} >
                    
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                    <div className="from-group">
                    <input type="text" className="form-control" onChange={this.onChangeFiliere} name="filiere" id="filiere" placeholder="filiere" />
                    </div>
                    <div className="from-group">
                    <input type="text" className="form-control" onChange={this.onChangeAnnee} name="annee" id="annee" placeholder="annee" />
                    </div>
                 
                    <button className="btn btn-primary"  >Add</button>
    
                </form>

        </div>
    );
  }
}

export default Home;
