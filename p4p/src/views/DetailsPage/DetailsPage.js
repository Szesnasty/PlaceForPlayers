import React, {Component} from 'react';
import axios from 'axios';
import Nav from 'components/Nav/Nav';

class DetailsPage extends Component {
    state = { 
        // idOfGame: ,
        gameDetails: []
     }

    componentDidMount(){
        this.getDataOfSingleGame()
    }     

    getDataOfSingleGame=()=>{
       
    axios
    .get(`https://api.rawg.io/api/games/${this.props.match.params.id}`)
    .then((response) => {
        const gameDetails=response.data;
        this.setState({
            gameDetails
        })
    
        })
     
    
    }

    render() { 
        console.log(this.state.gameDetails)
        return ( <><Nav /></> );
    }
}
 
export default DetailsPage;
 
