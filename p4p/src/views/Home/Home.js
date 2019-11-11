import React, {Component} from 'react';
import axios from 'axios';

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
       
        return ( <h1></h1> );
    }
}
 
export default Home;