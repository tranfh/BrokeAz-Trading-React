import React from 'react';

const SearchBox = ({ searchChange }) => {
  return (
    <div className="pa2 ba">
      <input
        className="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="Search Stocks"
        onChange={searchChange}
      ></input>
      <button>Search</button>
    </div>
  );
};

export default SearchBox;
