import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/actionCreators';

class Search extends Component {
  state = {};

  searchInputRef = React.createRef();

  render() {
    const { onHandleSearch } = this.props;
    return (
      <label htmlFor="search">
        <input
          type="text"
          onChange={e => onHandleSearch(e, this.searchInputRef)}
          placeholder="Search..."
          ref={this.searchInputRef}
          id="search"
        />
      </label>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleSearch: (e, referenceToSearchInput) =>
      dispatch(actionCreators.handleSearch(e, referenceToSearchInput)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
