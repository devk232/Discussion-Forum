import React, { useState } from 'react';
import { updateUserProfile } from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Profile.css';

function EditProfile({ user, onClose }) {
    const [formData, setFormData] = useState({
        profile_picture: user.profile_picture,
        bio: user.bio,
        linkedin: user.linkedin,
        github: user.github,
        twitter: user.twitter,
        instagram: user.instagram,
        facebook: user.facebook,
    });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(user.email, formData);
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="edit-profile-modal">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div>
                    <label>Profile Picture</label>
                    <input
                        type="text"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Github</label>
                    <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Twitter</label>
                    <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Facebook</label>
                    <input
                        type="text"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-btn-group">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
