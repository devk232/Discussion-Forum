import React, { Component } from "react";
import { logout } from '../services/authService';

class Logout extends Component {
    async componentDidMount() {
        try {
            await logout();
            window.location = "/dashboard";
        } catch (error) {
            console.error('Logout Error:', error);
            // Handle logout error if needed
        }
    }

    render() {
        return null;
    }
}

export default Logout;
