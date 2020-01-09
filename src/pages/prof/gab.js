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
import Nav from '../../components/nav';
class GAB extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         students:[],
         element:{},
         session:{},
         theClass:{},
         absences:[],
         prof_id:'',
         err:''
     }
    }
loadAbsents=()=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_LsnPx')
         } 

        axios.get('//localhost:5000/absences/all/'+this.props.match.params.id,{headers:headers})
        .then(res =>{
            this.setState({
                absences:res.data
            });
            console.log(res.data)
        })
        .catch(error =>{
            this.setState({err:error.response.data.msg})
        });

}
    loadStudents = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_LsnPx')
             } 

            axios.get('//localhost:5000/absences/students/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    students:res.data.students,
                    element:res.data.element,
                    session:res.data.session,
                    theClass:res.data.theClass
                });
                console.log(res.data)
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
            });

    }
  componentDidMount(){

    let lsnpx = localStorage.getItem('_LsnPx');
   
    if(lsnpx){
        let headers={
            'x-auth-token':lsnpx
          }
      axios.get("//localhost:5000/auth/check",{
        headers:headers
      })
      .then(res=>{     
        this.setState({
          prof_id:res.data.user.id
        })
        this.loadStudents();
        this.loadAbsents();

    })
      .catch(
        err => {
            console.log(err);
          localStorage.removeItem('_LsnPx');
          localStorage.clear();

        }
      );

    }

 }

 clicked = (student_id,hours)=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_LsnPx')
         } 
    const cred={
        session_id:this.state.session._id,
        etudiant_id:student_id,
        hours:hours,
        prof_id:this.state.prof_id,
        element_id:this.state.element._id
    }
         axios.post('//localhost:5000/absences/add',cred,{headers:headers})
         .then(res =>{
             console.log(res.data)
             this.loadStudents();
             this.loadAbsents();

        })
         .catch(error =>{
            this.setState({err:error.response.data.msg});
         });

 }

 mappingStudents = () =>{

     return this.state.students.map((student) =>{
         const  d=  this.state.absences.some((abs) => abs.etudiant_id == student._id);
         if(d){
             return null;
         }else{
             return(<tr >
  
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{this.state.theClass.filiere} {this.state.theClass.annee}</td>
    
                
              <td><button onClick={() => this.clicked(student._id,2)} className="btn btn-danger">2 hours</button></td>
                        <td><button onClick={() => this.clicked(student._id,4)} className="btn btn-danger">4 hours</button></td>
                
                
              </tr>);
         }

     }
            
         
     
  
       )
 }
  render() {
    return (


        <div className="container">
            <Nav />
        <h1> Gestion d'Absence !  </h1>
        <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 

        <table class="table">
  <thead class="thead-dark">
    <tr>

      <th scope="col">firstName</th>
      <th scope="col">lastName</th>
      <th scope="col">class</th>
      <th colSpan="2">actions</th>


    </tr>
  </thead>
  <tbody>
   
  {this.mappingStudents()}
  </tbody>
</table>
        </div>
    );
  }
}

export default GAB;
