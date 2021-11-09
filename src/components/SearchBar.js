import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div>
      <input
        className="pa3 w-100 ba b--blue bg-light-gray"
        type="search"
        placeholder="Search Company..."
        onChange={searchChange}
      ></input>
    </div>
  );
};

export default SearchBox;
