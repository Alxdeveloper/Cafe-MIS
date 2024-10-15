import React, { useState, useEffect } from 'react';
import { FaEdit, FaLock, FaUserPlus, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Settings = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const [users, setUsers] = useState([]); // State to store users

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/myproject/users/'); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubMenuToggle = () => {
    setSubMenuVisible((prev) => !prev);
  };

  const renderSubMenuContent = () => {
    switch (activeSubMenu) {
      case 'editUser':
        return (
          <div className="card p-3">
            <h2>Edit User Profile</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        );
      case 'changePassword':
        return (
          <div className="card p-3">
            <h2>Change Password</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input type="password" className="form-control" id="currentPassword" />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input type="password" className="form-control" id="newPassword" />
              </div>
              <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
          </div>
        );
      case 'uploadProfilePicture':
        return (
          <div className="card p-3">
            <h2>Upload Profile Picture</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="profilePicture" className="form-label">Select a profile picture</label>
                <input type="file" className="form-control" id="profilePicture" />
              </div>
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          </div>
        );
      case 'deleteUser':
        return (
          <div className="card p-3">
            <h2>Delete User Profile</h2>
            <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
            <button className="btn btn-danger">Delete Profile</button>
          </div>
        );
      case 'addUser':
        return (
          <div className="card p-3">
            <h2>Add New User</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="newUsername" className="form-label">Username</label>
                <input type="text" className="form-control" id="newUsername" />
              </div>
              <div className="mb-3">
                <label htmlFor="newEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="newEmail" />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="newPassword" />
              </div>
              <button type="submit" className="btn btn-success">Add User</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container mt-4'>
      <h1 className="text-center">User Settings</h1>
      <div className="text-center mb-3">
        <button onClick={handleSubMenuToggle} className="btn btn-primary">
          Settings
        </button>
      </div>
      {isSubMenuVisible && (
        <div className="row justify-content-center mb-4">
          <div className="col-md-4">
            <div className="list-group">
              <button 
                className="list-group-item list-group-item-action" 
                onClick={() => {
                  setActiveSubMenu('editUser');
                  setSubMenuVisible(true);
                }}
              >
                <FaEdit /> Edit User Profile
              </button>
              <button 
                className="list-group-item list-group-item-action" 
                onClick={() => {
                  setActiveSubMenu('changePassword');
                  setSubMenuVisible(true);
                }}
              >
                <FaLock /> Change Password
              </button>
              <button 
                className="list-group-item list-group-item-action" 
                onClick={() => {
                  setActiveSubMenu('uploadProfilePicture');
                  setSubMenuVisible(true);
                }}
              >
                <FaUserPlus /> Upload Profile Picture
              </button>
              <button 
                className="list-group-item list-group-item-action" 
                onClick={() => {
                  setActiveSubMenu('deleteUser');
                  setSubMenuVisible(true);
                }}
              >
                <FaTrash /> Delete User Profile
              </button>
              <button 
                className="list-group-item list-group-item-action" 
                onClick={() => {
                  setActiveSubMenu('addUser');
                  setSubMenuVisible(true);
                }}
              >
                <FaPlus /> Add User
              </button>
            </div>
          </div>
          <div className="col-md-8">
            {/* Render the content of the active submenu */}
            {isSubMenuVisible && renderSubMenuContent()}
          </div>
        </div>
      )}
      
      {/* Display Current Users in a Table */}
      <h2 className="mt-5">Current Users</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
