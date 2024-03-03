import React from 'react'
import UserList from './UserList';
import ChatList from './ChatList';
import DocumentList from './DocumentList';
import Logout from './Logout';

export default class LoginSuccess extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeComponent: null,
      showSuccess: true,
      groupPage: false,
      manageUser: false,
      managedocument: false,
      logout: false,
      loggedInUserName: '',
    };
  }
  componentDidMount() {
    this.fetchLoggedInUserName();
  }

  fetchLoggedInUserName = () => {
    // Retrieve the login user name from localStorage
    const loggedInUserName = JSON.parse(localStorage.getItem('loggedInUser'));
    // console.log(loggedInUserName);
    if (loggedInUserName) {
      // Update the state with the retrieved user name
      // console.log(loggedInUserName)
      this.setState({ loggedInUserName: loggedInUserName.name });
    }
  };

  handleComponentChange = (componentName) => {
    this.setState({ activeComponent: componentName, showSuccess: false });
    if (componentName === "ChatList") {
      this.setState({ groupPage: true, manageUser: false, managedocument: false, logout: false })
    } else if (componentName === "UserList") {
      this.setState({ groupPage: false, manageUser: true, managedocument: false, logout: false })
    } else if (componentName === "DocumentList") {
      this.setState({ groupPage: false, manageUser: false, managedocument: true, logout: false })
    } else if (componentName === "Logout") {
      this.setState({ groupPage: false, manageUser: false, managedocument: false, logout: true })
    }
  };

  render() {
    const { activeComponent, showSuccess } = this.state;
    const { loggedInUserName } = this.state;
    let componentToRender = null;
    switch (activeComponent) {
      case 'ChatList':
        componentToRender = <ChatList />;
        break;
      case 'UserList':
        componentToRender = <UserList />;
        break;
      case 'DocumentList':
        componentToRender = <DocumentList />;
        break;
      case 'Logout':
        componentToRender = <Logout />;
        break;
      default:
        break;
    }

    return (
      <div className="container">

        <div className='navbar'>
          <p className={`${this.state.groupPage ? "activePage" : ""}`} onClick={() => this.handleComponentChange('ChatList')}>
            Group Chat
          </p>
          <p className={`${this.state.manageUser ? "activePage" : ""}`} onClick={() => this.handleComponentChange('UserList')}>
            Manage Users
          </p>
          <p className={`${this.state.managedocument ? "activePage" : ""}`} onClick={() => this.handleComponentChange('DocumentList')}>
            Manage Document
          </p>
          <p className={`${this.state.logout ? "activePage" : ""}`} onClick={() => this.handleComponentChange('Logout')}>
            Logout
          </p>

        </div>
        {showSuccess && (
          <div className='success'>
            <h2>Login Successful</h2>
            <p>Welcome! <strong> {loggedInUserName} </strong></p>
          </div>
        )}
        <div>{componentToRender}</div>
      </div>
    );
  }
}
