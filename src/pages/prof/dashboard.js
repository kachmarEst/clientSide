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
class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state ={
        prof_id:'',
        elements:[],
        err:'',
        classes:[],
        sessions:[],
        sum:[]
    }
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
        this.loadElements(this.state.prof_id);
        this.loadSessions(this.state.prof_id);
        this.loadAbsc(this.state.prof_id);

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

 loadSessions=(id)=>{
  const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json',
    'x-auth-token':localStorage.getItem('_LsnPx')
     } 
console.log(id)
    axios.get('//localhost:5000/sessions/all/'+id  ,{headers:headers})
    .then(res =>{
        this.setState({
           sessions:res.data.sessions
        });
    })
    .catch(error =>{
        // this.setState({err:error.response.data.msg})
        console.log(error);
        console.log(error.response)
    });

 }
loadAbsc=(id)=>{
  axios.get('//localhost:5000/absences/counts/stats/'+id)
  .then(res =>{
    this.setState({
      sum:res.data
    })
    console.log(res.data)
  })
  .catch(err =>{
    console.log(err);
  })
}
 loadElements = (id) =>{
  
  const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json',
    'x-auth-token':localStorage.getItem('_LsnPx')
     } 
console.log(id)
    axios.get('//localhost:5000/users/dashboard/profs/'+id  ,{headers:headers})
    .then(res =>{
        this.setState({
            classes:res.data.classes,
            elements:res.data.elements
        });
    })
    .catch(error =>{
        this.setState({err:error.response.data.msg})
    });

}

 Mapping = ()=>{
  return this.state.elements.map((element)=>{

   let theC=this.state.classes.find(clas =>clas._id == element.class_id);

   return(
   <div className="card text-white bg-secondary mb-3" >
    <div className="card-header">Class : {theC.filiere} {theC.annee}</div>
    <div className="card-body">

      <h5 className="card-title"> {element.element}</h5>

      <p className="card-text"><Link className="btn btn-warning" to={"/session/"+element._id}>New Session</Link></p>
    </div>
  </div>
   )

  })

 }


 MappingSessions=()=>{
if(this.state.sessions){
  return this.state.sessions.map((session)=>{
    let theE=this.state.elements.find(element => element._id == session.element_id);
    let theC=this.state.classes.find(clas =>clas._id == theE.class_id);
    let date =new Date(session.createdAt).toDateString();
    if(theE && theC){
      return(
        <tr>
          <td>{theE.element}</td>
          <td>{theC.filiere} {theC.annee}</td>
          <td>{session.hdeb}-{session.hfin}</td>
          <td>{date}</td>
          <td><Link className="btn btn-warning" to={"/sessions/"+session._id}>Gestion Absence</Link></td>
       </tr>
        )
    }else{
      return '';
    }
   
  })
 }

else{
  return '';
}
 }

 MappingElementsT=()=>{
  return this.state.sum.map((item)=>{
    let element = this.state.elements.find((data)=> data._id == item._id);
    let theC = this.state.classes.find((clas)=> clas._id == element.class_id);
    return(   <div className="card text-white bg-secondary mb-3" >
    <div className="card-header">Class : {theC?theC.filiere:''} {theC?theC.annee:''}</div>
    <div className="card-body">

      <h5 className="card-title"> {element?element.element:''}</h5>

      <p className="card-text">{item.hours} hours</p>
    </div>
  </div>);
  })

 }

  render() {
    return (


        <div className="container">
            <Nav />
        <h1>Your Classes</h1>
    <div className="row">

      {this.Mapping()}
      </div>
      <h1>Your Sessions</h1>


      <div className="row">
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Element</th>
      <th scope="col">filiere</th>
      <th scope="col">Time</th>
      <th scope="col">date</th>
      <th scope="col">action</th>

    </tr>
  </thead>
<tbody>
{this.MappingSessions()}
</tbody>
      </table>
</div>
<h1>Statistics On your Elements</h1>

<div className="row">
{this.MappingElementsT()}
</div>
        </div>
    );
  }
}

export default Dashboard;
