import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {

const [credential, setCredential] = useState({email:"",password:""});

let history=useHistory();

    const handleClick=async(e)=>{
        e.preventDefault();
        const response = await fetch('https://tasks-manage-api.herokuapp.com/api/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
      
            headers: {
              'Content-Type': 'application/json',
             
            },
       
               body: JSON.stringify({email:credential.email,password:credential.password})
          });
          const json=await response.json();
//console.log(json.jwtdata);
          localStorage.setItem('token', json.jwtdata);
          props.setFlag(false);
        //  console.log(json.jwtdata);
          if(json.success)
          {
             history.push("/");
             props.showAlert('Logged In successfully','success')
          }
          else
          {
              props.showAlert('Invalid Credentials','danger')
          }
    }

    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]: e.target.value})
        }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" onChange={onChange} value={credential.email}  name="email" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" id="exampleInputPassword1" onChange={onChange}  value={credential.password}/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
