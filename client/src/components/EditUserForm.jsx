import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditUserForm extends Component {
    state = {
        name: '',
        email: '',
        username: '',
        cinNumber: '',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user && nextProps.user.email !== prevState.email) {
            const { name, email, username, cinNumber } = nextProps.user;
            return {
                name: name || '',
                email: email || '',
                username: username || '',
                cinNumber: cinNumber || '',
            };
        }
        return null;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        const { name, email, username, cinNumber } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={this.handleChange} disabled />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange} />
                </div>
                <div>
                    <label>CIN Number:</label>
                    <input type="text" name="cinNumber" value={cinNumber} onChange={this.handleChange} />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={this.props.onCancel}>Cancel</button>
            </form>
        );
    }
}

EditUserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditUserForm;
