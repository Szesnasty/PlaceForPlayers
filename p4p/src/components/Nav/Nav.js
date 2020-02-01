import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import styles from 'components/Nav/Nav.module.scss';
import Search from 'components/Search/Search';
import logoImage from 'assets/logo.png';
import facebookIcon from 'assets/facebook.png';
import gitHubIcon from 'assets/github.png';

class Nav extends Component {
  state = {
    isMenuOpen: false,
    windowWidth: null,
  };

  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth });
    window.addEventListener('resize', this.updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  setIsMenuOpen = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const { match } = this.props;
    const { url } = match;
    const { isMenuOpen, windowWidth } = this.state;
    const isOpen = isMenuOpen ? styles.visible : '';

    const SearchComponent = url === '/' ? <Search /> : null;

    return (
      <nav className={styles.MainNav}>
        <div className={styles.BtnWrapper}>
          <button className={styles.MainNavBtn} type="button" onClick={() => this.setIsMenuOpen()}>
            <span className={styles.MainNavBtnSpan} />
            <span className={styles.MainNavBtnSpan} />
            <span className={styles.MainNavBtnSpan} />
          </button>
        </div>

        <ul className={`${styles.MainNavList} ${isOpen}`}>
          <li className={`${styles.MainNavList__item} ${styles.MainNavList__itemLogoWrapper}`}>
            <img className={styles.MainNavList__logo} alt="logo" src={logoImage} />
          </li>
          <li className={styles.MainNavList__item}>
            <NavLink
              className={styles.MainNavList__Link}
              activeClassName={styles.active}
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className={styles.MainNavList__item}>
            <NavLink
              className={styles.MainNavList__Link}
              activeClassName={styles.active}
              exact
              to="/your-fav-games"
            >
              Your Fav Games
            </NavLink>
          </li>

          <li className={`${styles.MainNavList__item} ${styles.MainNavList__socialWrapper}`}>
            <a
              className={styles.MainNavList__socialLink}
              href="https://www.facebook.com/profile.php?id=100003788571383"
            >
              <img className={styles.MainNavList__socialIcon} alt="facebook" src={facebookIcon} />
            </a>

            <a className={styles.MainNavList__socialLink} href="https://github.com/Szesnasty">
              <img className={styles.MainNavList__socialIcon} alt="github" src={gitHubIcon} />
            </a>
          </li>
          <li className={styles.MainNavList__item}>{windowWidth > 768 ? SearchComponent : null}</li>
        </ul>
        {windowWidth <= 768 ? SearchComponent : null}
      </nav>
    );
  }
}

export default withRouter(Nav);
