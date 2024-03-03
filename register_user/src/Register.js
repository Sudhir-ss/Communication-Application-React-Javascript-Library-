import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const [fname, setfname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [conpassword, setconpass] = useState("");
  const [showfname, seterrfname] = useState(false);
  const [showemail, seterremail] = useState(false);
  const [showpassword, seterrpassword] = useState(false);
  const [showconpassword, seterrconpassword] = useState(false);
  const [matchconpassword, seterrmatchconpassword] = useState(false);
  // const [data,setdata] = useState([]);
  const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
  // const addData = [];

  const navi = useNavigate();

  const handleChange = (e) => {
    if (e.target.name == "fname") {
      setfname(e.target.value);
    }

    if (e.target.name == "email") {
      setemail(e.target.value);
    }

    if (e.target.name == "password") {
      setpassword(e.target.value);
    }

    if (e.target.name == "confirm_password") {
      setconpass(e.target.value);
    }
  }
  // let userObjS = JSON.stringify(registerObj); // convert object into string
  // localStorage.setItem("user", userObjS);
  // }
  const formsubmit = (e) => {
    e.preventDefault();
    if (fname == "") {
      seterrfname(true);
    } else {
      seterrfname(false);
    }
    if (email == "") {
      seterremail(true);
    } else {
      seterremail(false);
    }
    if (password == "") {
      seterrpassword(true);
    } else {
      seterrpassword(false);
    }
    if (conpassword == "") {
      seterrconpassword(true);
    } else {
      seterrconpassword(false);
    }

    if (conpassword != "" && conpassword != password) {
      seterrmatchconpassword(true);
    } else {
      seterrmatchconpassword(false);
    }

    if (fname != "" && email != "" && password != "" && conpassword != "" && password == conpassword) {
      const userObj = {
        name: fname,
        email: email,
        password: password,
        confirmpassword: conpassword,
        id: uuidv4()
      }
      // addData.push(userObj);
      // const userObjS = JSON.stringify(userObj); // convert object into string
      // localStorage.setItem("user",JSON.stringify(addData));
      users.push(userObj)
      localStorage.setItem("users", JSON.stringify(users));
      navi("/RegisterSuccessful");
    }

    
    // console.log(fname, email, password, conpassword);
    
  }


  return (<>
    <div className='container mt-3'>
      <section>
        <h3>Sign Up</h3>
        <form >
          <div className="mb-3 col-lg-4 txt">
            <label className="form-label ">Name</label>
            <input type="text" className="form-control" onChange={handleChange} value={fname} name="fname" id="fname"></input>
            {showfname && <p style={{ color: "red" }} >This field can't be blank</p>}
          </div>
          <div className="mb-3 col-lg-4 txt">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={handleChange} value={email} id="email" name="email"></input>
            {showemail && <p style={{ color: "red" }} >This field can't be blank</p>}
          </div>
          <div className="mb-3 col-lg-4 txt">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" onChange={handleChange} value={password} id="password" name="password"></input>
            {showpassword && <p style={{ color: "red" }} >This field can't be blank</p>}
          </div>
          <div className="mb-3 col-lg-4 txt">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirm_password" value={conpassword} onChange={handleChange} name="confirm_password"></input>
            {showconpassword && <p style={{ color: "red" }} >This field can't be blank</p>}
            {matchconpassword && <p style={{ color: "red" }} >Password Dosen't Match</p>}
          </div>

          <button style={{ marginLeft: "420px" }} type="submit" className="btn btn-primary txt" onClick={formsubmit}>Submit</button>
        </form>
        <p style={{ marginLeft: "420px" }}>Already have an Account ? <span style={{ cursor: "pointer", color: 'blue' }} onClick={() => navi("/Login")}>Sign In</span></p>
      </section>
    </div>
  </>
  )
}

export default Register;