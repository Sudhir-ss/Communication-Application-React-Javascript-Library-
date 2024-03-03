import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";


function UserList() {

  const [userData, setUserData] = useState([]);
  const [selectIndex, setselectIndex] = useState('');
  const [show, setShow] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEditId, setnewEditId] = useState('');
  const [showEditMode, setshowEditMode] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setnewEditId(id)
    setShow(true);
  }
  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('users');
    if (storedData) {
      // Parse the stored data
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  useEffect(() => {
    // Check if the user is logged in
    const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUser'));
// console.log(loggedInUsers.name);
      setLoggedInUser(loggedInUsers);
      setNewName(loggedInUsers.name); // Set initial value for newName
  }, []);

  const handleEdit = (index) => {
    // Implement edit logic here
    // console.log(index);
    // console.log('Edit user:', userData[index]);
    setshowEditMode(true);
    setEditingIndex(index);
    setEditedName(userData[index].name);
    setEditedEmail(userData[index].email);
    setselectIndex(userData[index].id);
  };
// console.log(selectIndex);
  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement delete logic here
// console.log(index);
const updatedData = userData.filter((upload) => upload.id !== id);
    // const updatedData = [...userData];
    // updatedData.splice(index, 1);
    setUserData(updatedData);
    localStorage.setItem('users', JSON.stringify(updatedData));
    setShow(false);
  };

  const handleSave = () => {
    const updatedData = [...userData];
    const updatedUser = { ...loggedInUser, name: editedName };
    
    // console.log("ankur",{...userData[selectIndex],updatedData});
    const findUser = userData.find( (u) => u.id == selectIndex);
    updatedData[editingIndex] = { ...findUser,name: editedName, email: editedEmail };
    setUserData(updatedData);
    localStorage.setItem('users', JSON.stringify(updatedData));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    setEditingIndex(-1);
    setshowEditMode(false);
  };

  return (
    <>
      <div style={{display:showEditMode?'none':'block'}}>
        <h2>Users</h2>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">User Email Id</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody  >
            {userData.map((user,index) => (
              <tr key={user.id}>
                <td style={{width:"33%"}}>{user.name}</td>
                <td style={{width:"33%"}}>{user.email}</td>
                <td style={{width:"33%"}}>
                  <Button className='btnn' style={{marginRight:"5px"}} onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                  {/* <button variant="primary" onClick={() => handleEdit(index)}></button> */}
                  <Button className='btnn' onClick={() => handleShow(user.id)}>
                    Delete
                  </Button>

                  <Modal className='mod' show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm User Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><FontAwesomeIcon icon={faQuestionCircle} style={{ color: "blue", marginRight: "10px" }} />Are you sure ?</Modal.Body>
                    <Modal.Footer className='foote'>
                      <Button className='foot' variant="primary" onClick={() => handleDelete(newEditId)}>
                        Ok
                      </Button>
                      <Button className='foot' variant="primary" onClick={handleClose}>
                        Cancel
                      </Button>

                    </Modal.Footer>
                  </Modal>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:showEditMode?'block':'none'}}>
        <h2 style={{textAlign:"center"}}>Edit User Information</h2>
        <div className='row'>
          <div className='col-12'>
            <label htmlFor="">
              Full Name :
            </label>
            <input className='edituse' type="text" value={editedName}  onChange={(e) => setEditedName(e.target.value)} name='editname' id='editname' />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <label htmlFor="">
              Email :
            </label>
            <input className='edituse' style={{marginLeft: "33px"}} type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} name='editemail' id='editemail' />
          </div>
        </div>
        <div style={{textAlign: "center",marginTop:"20px"}}>
        <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </>
  );
}


export default UserList;