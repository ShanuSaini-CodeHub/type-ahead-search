import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onChangeInput = async (e) => {
    e.preventDefault();
    const searchInputValue = e.target.value;
    setSearchInput(searchInputValue);
    let results = [];
    if (searchInputValue?.length > 0) {
      results = await getSearchResults(searchInputValue);
    }
    setSearchResults(results);
  }

  const getSearchResults = async (searchInputValue) => {
    let results = [];
    try {
      const response = await axios.get("./cities.json");
      if (response.data?.length > 0) {
        results = response.data.filter(search => search.toLowerCase().trim().includes(searchInputValue.toLowerCase().trim()));
      }
      return results;
    } catch (error) {
      console.error("Error fetching the data: ", error);
      return [];
    }
  }

  const onSetSearchInput = (e, searchResult) => {
    e.preventDefault();
    setSearchInput(searchResult)
  }

  return (
    <div className="App">
      <div className="container form-group col-md-4 mt-5">
        <h3>Please enter a City to search</h3>
        <input
          type="search"
          className="form-control mt-4"
          placeholder="Search cities..."
          value={searchInput}
          onChange={e => onChangeInput(e)}
        />
        <ul className="list-group list-items">
          {searchResults?.length > 0 && searchResults?.map(searchResult => {
            const value = searchResult.toLowerCase().replaceAll(searchInput.toLowerCase().trim(), (value) => `<strong>${value}</strong>`);
            return (
              <li key={`City-${searchResult}`} className="list-group-item" onClick={(e) => onSetSearchInput(e, searchResult)}>
                <span dangerouslySetInnerHTML={{ __html: value }} />
              </li>
            );
          })}
          {searchInput !== '' && searchResults?.length === 0 &&
            <li key={`no-result`} className="list-group-item">
              {"No results found"}
            </li>
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
