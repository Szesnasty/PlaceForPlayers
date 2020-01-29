import React, { Component } from 'react';
import axios from 'axios';
import Nav from 'components/Nav/Nav';
import Wrapper from 'components/Wrapper/Wrapper';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';

import styles from 'views/DetailsPage/DetailsPage.module.scss';

class DetailsPage extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    gameDetails: [],
  };

  componentDidMount() {
    this.getDataOfSingleGame();
  }

  getDataOfSingleGame = () => {
    axios.get(`https://api.rawg.io/api/games/${this.props.match.params.id}`).then(response => {
      const gameDetails = response.data;
      this.setState({
        gameDetails,
      });
    });
  };

  render() {
    return (
      <>
        <Wrapper>
          <Nav />
          <ContentWrapper>
            <h1 className={styles.WhiteColor}>Soon...</h1>
          </ContentWrapper>
        </Wrapper>
      </>
    );
  }
}

export default DetailsPage;
