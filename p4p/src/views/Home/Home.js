import React, {Component} from 'react';
import axios from 'axios';

import HomeWrapper from 'components/HomeWrapper/HomeWrapper';
import List from 'components/List/List';

class Home extends Component {
    state = { 
        listOfGames: []
     }
    componentDidMount(){
        this.getData();
    }

    getData =()=>{
        axios
        .get('https://api.rawg.io/api/games')
        .then((response) => {
            const listOfGames=response.data.results;
            this.setState({
                listOfGames
            })
       
          })
    }

    render() { 
        console.log(this.state)
        const {listOfGames}=this.state;
       
        return (
            <HomeWrapper>    
                <List data={listOfGames}  />
            </ HomeWrapper >
       
        );
    }
}
 
export default Home;