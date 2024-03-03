import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/Nav.css";

const Homepage = () => {

  const navigate = useNavigate();
  return (

    <>
      <div className='mt-5'>
        <div >
          <h2 className='ttc mb-3'>Welcome to Users Module</h2>
          <h6 className='ttc'>Existing Users</h6>
          <div style={{ textAlign: "center" }}>
            <button style={{backgroundColor:"bisque",color:"black"}} className='logi mt-4 mb-4 btn' onClick={() => navigate("/login")}>Login</button>
          </div>
          <div>
            <h6 className='ttc'>New Users</h6>
          </div>
          <div style={{ textAlign: "center" }}>
            <button style={{backgroundColor:"bisque",color:"black"}} className='logi mt-4 mb-4 btn' onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage;