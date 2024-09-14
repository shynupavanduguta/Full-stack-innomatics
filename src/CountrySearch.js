import React, { useState, useEffect } from 'react';
// import './CountrySearch.css';

const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    // Fetch the local JSON file from the public folder
    setLoading(true);
    fetch('/countries.json')  // Corrected path to the JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setError('Failed to load country data');
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(
    (country) => {
      // Ensure country and capital exist before filtering
      const countryName = country?.country?.toLowerCase() || '';
      const capitalName = country?.capital?.toLowerCase() || '';
      
      return countryName.includes(query.toLowerCase()) || capitalName.includes(query.toLowerCase());
    }
  );

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a country or capital"
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="countries-list">
        {filteredCountries.map((country, index) => (
          <li key={index} className="country-card">
            <div className="country-info">
              <div className="country-details">
                <h2 className="country-name">{country.country}</h2>
                <p>Capital: {country.capital ? country.capital : 'N/A'}</p>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Official Language: {Array.isArray(country.official_language) ? country.official_language.join(', ') : country.official_language}</p>
                <p>Currency: {country.currency}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountrySearch;
