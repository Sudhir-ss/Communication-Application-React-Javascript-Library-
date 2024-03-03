import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  
  
  const navgate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, seterrpassword] = React.useState(false);
  const [showemail, seterremail] = React.useState(false);
  const [matcherr, setmatcherr] = React.useState(false);

  const handleChange = (e) => {
  
    if (e.target.name == "email") {
      setemail(e.target.value);
    }

    if (e.target.name == "password") {
      setpassword(e.target.value);
    }

    
  }

  const handlelogin = (e) =>{
      e.preventDefault();
    if(email == "" ){
      seterremail(true);
    }else{
      seterremail(false);
    }
    if(password == "" ){
      seterrpassword(true);
    }else{
      seterrpassword(false);
    }


    if(email != "" && password != "" ){
      const  users = JSON.parse(localStorage.getItem("users")) || [];
      if(users.length>0){
        if(users.some((val)=>val.email != email && val.password != password)){
          setmatcherr(true);
        }else{
          setmatcherr(false);
        }
const matchedUser = users.find((val)=>val.email == email && val.password == password);

        if(users.some((val)=>val.email == email && val.password == password)){
          localStorage.setItem("loggedInUser",JSON.stringify(matchedUser));
          navgate("/");
         
        }
      }
    }
    // navgate("/LoginSuccess");
  }


    return(<>
    <div className='container m-5'>
      <section>
        <h3>Sign In</h3>
        <form>
          
          <div className="mb-3 col-lg-4 txt">
          {matcherr && <p style={{ color: "red",marginTop:"10px",marginBottom:"10px" }} >Invalid email/password</p>}
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={handleChange} value={email} id="email" name="email"></input>
            {showemail && <p style={{ color: "red" }} >This field can't be blank</p>}
            
           </div>
          <div className="mb-3 col-lg-4 txt">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={handleChange} value={password} id="password" name="password"></input>
            {showpassword && <p style={{ color: "red" }} >This field can't be blank</p>}
            </div>
          

          <button style={{marginLeft:"420px"}}type="submit" className="btn btn-primary txt" onClick={handlelogin}>Login</button>
        </form>
       
      </section>
    </div>
  </>
  )
}

export default Login;