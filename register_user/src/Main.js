import ChatList from "./ChatList";
import DocumentList from "./DocumentList";
import EditUser from "./EditUser";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import RegisterSuccessful from "./RegisterSuccessful";
import UserList from "./UserList";
import Welcome from "./Welcome";
import Homepage from "./Homepage";
import LoginSuccess from './LoginSuccess';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./nav";
import Protected from "./Protected";




function Main() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>


          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/registersuccessful" element={<RegisterSuccessful />} />
          <Route index element={<Protected><LoginSuccess /></Protected>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Main;
