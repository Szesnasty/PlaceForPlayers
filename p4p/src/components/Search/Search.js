import React from 'react';

const Search = (props) => {
    const {onChange, searchInputRef} = props;
    return ( 
        <label>
            <input
                type="text"
                onChange={onChange}
                placeholder="Search..."
                ref={searchInputRef}
            />
        </label>
     );
}
 
export default Search;