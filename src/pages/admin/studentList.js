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
class StudentList extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         students:[],
         classes:[],
         err:''
     }
    }

    loadStudents = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/students',{headers:headers})
            .then(res =>{
                this.setState({
                    students:res.data.students,
                    classes:res.data.classes
                });
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
    this.loadStudents();


    
 }

 clicked = (id)=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
         axios.delete('//localhost:5000/students/'+id,{headers:headers})
         .then(res =>{
             console.log(res.data.msg)
             this.loadStudents();
        })
         .catch(error =>{
            this.setState({err:error.response.data.msg});
         });

 }

 mappingProfs = () =>{
    let cla;

     return this.state.students.map((item) =>{

        cla = this.state.classes.find((clad) => clad._id == item.class_id);

         return(

            <tr >
  
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.cin}</td>
            <td>{item.cne}</td>
            <td>{cla.filiere} {cla.annee}</td>
            <td>{item.createdAt}</td>
            <td><Link className="btn btn-warning" to={"/student/"+item._id} >Edit</Link></td>
            <td><button onClick={() => this.clicked(item._id)} className="btn btn-danger">Delete</button></td>
          </tr>
         )
     }
  
       )
 }
  render() {
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE StudentList PAGE !  </h1>
        <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 

        <table class="table">
  <thead class="thead-dark">
    <tr>

      <th scope="col">firstName</th>
      <th scope="col">lastName</th>
      <th scope="col">cin</th>
      <th scope="col">cne</th>
      <th scope="col">class</th>
      <th scope="col">created_at</th>
      <th colSpan="2">actions</th>


    </tr>
  </thead>
  <tbody>
   
  {this.mappingProfs()}
  </tbody>
</table>
        </div>
    );
  }
}

export default StudentList;
