import React ,{useState} from 'react'

import { useHistory } from 'react-router-dom';

function Signup(props) {
    const [credential, setCredential] = useState({name:"",email:"",password:"",cpassword:""});

    let history=useHistory();

    const handleClick=async(e)=>{
        e.preventDefault();
        const {name,email,password}=credential;
        const response = await fetch('https://tasks-manage-api.herokuapp.com/api/auth/createuser', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
      
            headers: {
              'Content-Type': 'application/json',
             
            },
       
               body: JSON.stringify({name,email,password})
          });
          const json=await response.json();
         
              console.log(json);
              if(json.success)
              {
             history.push("/");
             console.log("signup");
           props.showAlert('created Account successfully','success')
              }
              else{
                  props.showAlert('Invalid Credentials','danger')
              }
    }
 
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]: e.target.value})
        }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name"   value={credential.name} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="exampleInputEmail1"  value={credential.email} aria-describedby="emailHelp"onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1"onChange={onChange}  value={credential.password} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="exampleInputCPassword1" onChange={onChange}   minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
