import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from 'components/Search/Search.module.scss';
import * as actionCreators from 'store/actions/actionCreators';

class Search extends Component {
  state = {};

  searchInputRef = React.createRef();

  render() {
    const { onHandleSearch } = this.props;
    return (
      <label htmlFor="search">
        <input
          className={styles.SearchInput}
          type="text"
          onChange={e => onHandleSearch(e, this.searchInputRef)}
          placeholder="Search game..."
          ref={this.searchInputRef}
          id="search"
        />
      </label>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleSearch: (e, referenceToSearchInput) =>
      dispatch(actionCreators.handleSearch(e, referenceToSearchInput)),
  };
};

export default connect(null, mapDispatchToProps)(Search);
