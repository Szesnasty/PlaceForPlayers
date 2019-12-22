import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'components/Nav/Nav.module.scss';
import Search from 'components/Search/Search';

const Nav = () => {
  return (
    <ul className={styles.MainNav}>
      <li className={styles.MainNav__item}>
        <NavLink className={styles.MainNav__Link} activeClassName={styles.active} exact to="/">
          Home
        </NavLink>
      </li>
      <li className={styles.MainNav__item}>
        <NavLink
          className={styles.MainNav__Link}
          activeClassName={styles.active}
          exact
          to="/your-fav-games"
        >
          Your Fav Games
        </NavLink>
      </li>
      <li className={styles.MainNav__item}>
        {/* <NavLink
          className={styles.MainNav__Link}
          activeClassName={styles.active}
          exact
          to="/your-fav-games"
        >
          Search
        </NavLink> */}
      </li>
      <li className={styles.MainNav__item}>
        {/* <Search searchInputRef={this.searchInputRef} onChange={this.handleSearch} /> */}
        {/* <Search /> */}
        <Search />
      </li>
    </ul>
  );
};

export default Nav;
