import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class AddElement extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            class_id:'',
            prof_id:'',
            element:'',
            classes:[],
            profs:[],
            err:''
        }
    }
    
   
    loadProfs = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/profs',{headers:headers})
            .then(res =>{
                this.setState({profs:res.data});
                console.log(res.data)
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
            });

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
    this.loadProfs();
    
 }

    AddElement = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            element:this.state.element,
            class_id:this.state.class_id,
            prof_id:this.state.prof_id
        }
        axios.post('//localhost:5000/elements/add',cred,{
            headers:headers
        })
        .then(
            res =>{
                this.props.history.push('/elements');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeProfId = (e) =>{
        this.setState({
            prof_id: e.target.value
        })
    }
    onChangeElement = (e) =>{
        this.setState({
            element: e.target.value
        })
    }
    onChangeClassId = (e) =>{
        this.setState({
            class_id: e.target.value
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


let optionsP = this.state.profs.map((data) =>
<option 
    key={data._id}
    value={data._id}
>
    {data.firstName}  {data.lastName} 
</option>
);
    return (


        <div className="container">
            <Navbar />
        <h1> WELCOME TO THE AddElement PAGE !  </h1>


        
        <form style={{margin: '8%'}} onSubmit={this.AddElement} >
                    
                    <h1>Add User</h1>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 

                    <div className="from-group">
                <label>Element</label>
                    <input type="text" className="form-control" onChange={this.onChangeElement} name="element" id="element" placeholder="element" />
                    </div>
                    <div className="from-group">
                <label>Professors</label>
                    <select type="text" className="form-control" onChange={this.onChangeProfId} name="prof_id">
                    <option>chose professor</option>

                    {optionsP}
                    </select>
                    </div>
                    <div className="from-group">
                <label>Classes</label>
                    <select type="text" className="form-control" onChange={this.onChangeClassId} name="class_id"  >
                        <option>chose filiere</option>
                    {optionsC}
                    </select>
                    </div>
             
                    <button className="btn btn-primary"  >Add</button>
    
                </form>
        </div>
    );
  }
}

export default AddElement;
