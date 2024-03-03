import React from 'react'
import { Navigate } from 'react-router-dom'

const Logout = () => {

  // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  localStorage.removeItem('loggedInUser');

  return <Navigate to="/Homepage" replace={true}></Navigate>;
}

export default Logout