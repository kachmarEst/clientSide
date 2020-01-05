import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class AddStudent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            cne:'',
            cin:'',
            class_id:'',
            lastName:'',
            firstName:'',
            classes:[],
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
    this.loadClasses();

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


    AddStudent = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            cne:this.state.cne,
            cin:this.state.cin,
            class_id:this.state.class_id,
            lastName:this.state.lastName,
            firstName:this.state.firstName
        }
        axios.post('//localhost:5000/students/add',cred,{
            headers:headers
        })
        .then(
            res =>{
                this.props.history.push('/students');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeCID = (e) =>{
        this.setState({
            class_id: e.target.value
        })
    }
    onChangeCNE = (e) =>{
        this.setState({
            cne: e.target.value
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
    let optionsC = this.state.classes.map((data) =>
    <option 
        key={data._id}
        value={data._id}
    >
        {data.filiere} {data.annee}
    </option>
);
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE AddStudent PAGE !  </h1>


        
        <form style={{margin: '8%'}} onSubmit={this.AddStudent} >
                    
                    <h1>Add Student</h1>
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
                <label>CNE</label>
                    <input type="text" className="form-control" onChange={this.onChangeCNE} name="cne" id="cne" placeholder="cne" />
                    </div>
                    <div className="from-group">
                <label>Filiere</label>
                <select className="form-control" onChange={this.onChangeCID} name="class_id" >
            <option>Chose Filiere</option>
                {optionsC}
                </select>
                    </div>
               
                    <button className="btn btn-primary"  >Add</button>
    
                </form>
        </div>
    );
  }
}

export default AddStudent;
