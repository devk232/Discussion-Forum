// components/SearchResult.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const query = useQuery();
  const searchTerm = query.get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/search?q=${searchTerm}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchTerm}"</h2>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul className="list-group">
          {results.map((result) => (
            <li key={result._id} className="list-group-item">
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;
