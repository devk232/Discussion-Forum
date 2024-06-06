// SearchBar.jsx

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios for making HTTP requests

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            try {
                const response = await axios.get(`/search?q=${searchTerm}`);
                // Handle the search results, e.g., navigate to a search results page
                console.log('Search results:', response.data);
                // Redirect to search results page
                history.push(`/search?q=${searchTerm}`);
            } catch (error) {
                console.error('Error searching:', error);
            }
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search here..."
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
        </div>
    );
};

export default SearchBar;
