import React, {Component} from 'react';
import List from 'components/List/List';
import Nav from 'components/Nav/Nav';


class FavGames extends Component {
    state = { 
        listOfFavGames:[]
     }

    componentDidMount(){
        let listOfyourFavGames= localStorage.getItem('favGames');

        listOfyourFavGames=JSON.parse(listOfyourFavGames)
        console.log(listOfyourFavGames)

        this.setState({
            listOfFavGames:listOfyourFavGames
        })
        
    }

    render() { 
        const {listOfFavGames}=this.state;
        return ( 
            <>
            <Nav />
            <List data={listOfFavGames}/>

            
            </>
         );
    }
}
 
export default FavGames;