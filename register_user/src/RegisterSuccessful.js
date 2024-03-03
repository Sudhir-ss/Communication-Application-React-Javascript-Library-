import React from 'react'
import { useNavigate } from 'react-router-dom';


const RegisterSuccessful = () => {
  const navig = useNavigate();
  return (
    <>
      <div className="container mt-6">
        <div style={{textAlign:"center",marginTop:"90px"}}>
          <h2>Registration Successful</h2>
        </div>
        <div style={{textAlign:"center",marginTop:"40px"}}>Thank You for your registration</div>
        <div style={{textAlign:"center",marginTop:"40px",cursor:"pointer",color:"blue"}} onClick={() => navig("/Homepage")}>Click here to go to homepage</div>
      </div>
    </>)

}

export default RegisterSuccessful;
