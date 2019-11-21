import React from 'react';

const Search = props => {
  const { onChange, searchInputRef } = props;
  return (
    <label htmlFor="search">
      <input
        type="text"
        onChange={onChange}
        placeholder="Search..."
        ref={searchInputRef}
        id="search"
      />
    </label>
  );
};

export default Search;
