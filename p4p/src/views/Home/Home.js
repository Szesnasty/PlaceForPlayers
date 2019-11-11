import React, {Component} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import HomeWrapper from 'components/HomeWrapper/HomeWrapper';
import List from 'components/List/List';

class Home extends Component {
    state = { 
        listOfGames: [],
        // startPage: 1,
        // sizeOfFirstPage: 10,


        currentPage:1,
        pageSize: 20
        
     }
    componentDidMount(){
        this.getInitData();
       
    }

    getInitData =()=>{
        const {currentPage, pageSize} =this.state;
        axios
        .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
        .then((response) => {
            const listOfGames=response.data.results;
            this.setState({
                currentPage: this.state.currentPage+1,
                listOfGames

            })
       
          })
    };


    fetchData = () => {
        const { currentPage, pageSize } = this.state;
        this.setState({ currentPage: currentPage + 1 });

        const timer = setTimeout(() => {
            axios
            .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
            .then(response =>
                this.setState({ 
                    listOfGames: [...this.state.listOfGames].concat(response.data.results) ,
                    // currentPage: currentPage + 1
                })
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
      };

    render() { 
        console.log(this.state)
        const {listOfGames}=this.state;
       
        return (
            <HomeWrapper>    
                <InfiniteScroll
                    dataLength={listOfGames.length}
                    next={this.fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    <List data={listOfGames}  />
                </InfiniteScroll>
            </ HomeWrapper >
       
        );
    }
}
 
export default Home;