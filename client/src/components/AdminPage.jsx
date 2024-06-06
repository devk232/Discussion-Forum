import React, { Component } from 'react';
import http from '../services/httpService';
import { api } from '../config';
import './AdminPage.css'; // Import CSS file for styling
import EditUserForm from './EditUserForm';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

class AdminPage extends Component {
  state = {
    users: [],
    roles: ['admin', 'professeur', 'ex-etudiant', 'etudiant', 'guest'],
    selectedUser: null,
    selectedRole: null,
    editingUser: null,
    showEditForm: false,
  };

  async componentDidMount() {
    try {
      const { data: users } = await http.get(api.usersEndPoint + 'all');
      const roles = ['admin', 'professeur', 'ex-etudiant', 'etudiant', 'guest'];

      this.setState({ users, roles });
    } catch (error) {
      console.error('Error fetching users and roles:', error);
    }
  }

  handleUserSelect = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = this.state.users.find((user) => user._id === selectedUserId);
    this.setState({ selectedUser });
  };

  handleRoleSelect = (event) => {
    const selectedRole = event.target.value;
    this.setState({ selectedRole });
  };

  handleAssignRole = async () => {
    const { selectedUser, selectedRole } = this.state;
    if (!selectedUser || !selectedRole) return;

    try {
      await http.put(api.usersEndPoint + selectedUser.email + '/role', { role: selectedRole });

      const updatedUsers = this.state.users.map((user) =>
          user.email === selectedUser.email ? { ...user, role: selectedRole } : user
      );
      this.setState({ users: updatedUsers, selectedUser: null, selectedRole: null });
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  handleEditUser = (user) => {
    this.setState({ editingUser: user, showEditForm: true });
  };

  handleDeleteUser = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await http.delete(`${api.usersEndPoint}/${userId}`);

      const updatedUsers = this.state.users.filter((user) => user._id !== userId);
      this.setState({ users: updatedUsers });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  handleEditFormSubmit = async (updatedUser) => {
    try {
      await http.put(`${api.usersEndPoint}${updatedUser.email}`, updatedUser);

      const updatedUsers = this.state.users.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
      );

      this.setState({ users: updatedUsers, showEditForm: false, editingUser: null });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  handleEditFormCancel = () => {
    this.setState({ showEditForm: false, editingUser: null });
  };

  getRoleCounts = () => {
    const roleCounts = this.state.roles.map(role => {
      return {
        name: role,
        value: this.state.users.filter(user => user.role === role).length
      };
    });
    return roleCounts;
  };

  render() {
    const { users, roles, selectedUser, selectedRole, showEditForm, editingUser } = this.state;
    const roleCounts = this.getRoleCounts();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    return (
        <div className="admin-page">
          <h1>Admin Page</h1>

          {showEditForm && editingUser ? (
              <EditUserForm
                  user={editingUser}
                  onSubmit={this.handleEditFormSubmit}
                  onCancel={this.handleEditFormCancel}
              />
          ) : (
              <>
                <div className="user-role-management">
                  <h2>User Role Management</h2>
                  <select onChange={this.handleUserSelect} value={selectedUser ? selectedUser._id : ''}>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                    ))}
                  </select>
                  <select onChange={this.handleRoleSelect} value={selectedRole}>
                    <option value="">Select a role</option>
                    {roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                    ))}
                  </select>
                  <button onClick={this.handleAssignRole}>Assign Role</button>
                </div>

                <h2>User List</h2>
                <table>
                  <thead>
                  <tr>
                    <th>Email</th>
                    <th>Username</th>
                    <th></th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>
                          <button onClick={() => this.handleEditUser(user)}>Edit</button>
                        </td>
                        <td>
                          <button onClick={() => this.handleDeleteUser(user._id)}>Delete</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
                <h2></h2>
                <h2>User Roles Distribution</h2>
                <PieChart width={600} height={600} center>
                  <Pie
                      data={roleCounts}
                      cx={250}
                      cy={250}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                  >
                    {roleCounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </>
          )}
        </div>
    );
  }
}


export default AdminPage;
