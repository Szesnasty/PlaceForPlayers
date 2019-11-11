import React, {Component} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import HomeWrapper from 'components/HomeWrapper/HomeWrapper';
import List from 'components/List/List';
import Loading from 'components/Loading/Loading'
import Modal from 'components/Modal/Modal'

class Home extends Component {
    state = { 
        listOfGames: [],
        // startPage: 1,
        // sizeOfFirstPage: 10,

        currentPage:1,
        pageSize: 20,

        isModal: false,
        modalContent: ''
        
     }
    
     modalRef = React.createRef();

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

    handleShowModal=(e)=>{

        const singleGameObject=this.state.listOfGames.filter(singleGameDetails => singleGameDetails.id === e)
        this.setState({
            isModal: true,
            modalContent: singleGameObject
        }) 
      
    }

    handleCloseModal=e=>{
        e.stopPropagation();
        if(e.target===this.modalRef.current){
            this.setState({
                isModal: false
            })
        }
    }


    fetchData = () => {
        const { currentPage, pageSize } = this.state;
        this.setState({ currentPage: currentPage + 1 });

        const timer = setTimeout(() => {
            axios
            .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
            .then(response =>
                this.setState({ 
                    listOfGames: [...this.state.listOfGames].concat(response.data.results) ,
                })
            );
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
      };

    render() { 
       
        const {listOfGames, isModal}=this.state;
       console.log(this.state)
        return (
            <>
            <HomeWrapper>    
                <InfiniteScroll
                    dataLength={listOfGames.length}
                    next={this.fetchData}
                    hasMore={true}
                    loader={<Loading />}
                >
                    <List onClick={(e)=>this.handleShowModal(e)} isModal={isModal} data={listOfGames}  >

                    </List>
                    
                </InfiniteScroll>
                
            </ HomeWrapper >
            {isModal ? <Modal modalRef={this.modalRef} onClick={e=>this.handleCloseModal(e)} modalContent={this.state.modalContent} /> : null}
            </>

          
       
        );
    }
}
 
export default Home;