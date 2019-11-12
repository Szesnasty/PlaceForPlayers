import React, {Component} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import HomeWrapper from 'components/HomeWrapper/HomeWrapper';
import List from 'components/List/List';
import Loading from 'components/Loading/Loading'
import Modal from 'components/Modal/Modal'

class Home extends Component {
    state = { 
        currentPage:1,
        isModal: false,
        listOfGames: [],
        modalContent: '',
        pageSize: 10
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
            const {currentPage}=this.state
            this.setState({
                currentPage: currentPage+1,
                listOfGames
            })
          })
    };

    handleShowModal= e =>{
        const {listOfGames}=this.state
        const singleGameObject=listOfGames.filter(singleGameDetails => singleGameDetails.id === e)
        this.setState({
            isModal: true,
            modalContent: singleGameObject
        }) 
      
    }

    handleCloseModal= e =>{
        console.log(e.target)
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
                    listOfGames: [...this.state.listOfGames].concat(response.data.results)
                })
            );
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
      };

    render() { 
       
        const { isModal, modalContent, listOfGames}=this.state;
        return (
            <>
            <HomeWrapper>    
                <InfiniteScroll
                    dataLength={listOfGames.length}
                    next={this.fetchData}
                    hasMore={true}
                    loader={<Loading />}
                >
                    <List onClick={this.handleShowModal} isModal={isModal} data={listOfGames}  />

                </InfiniteScroll>
                
            </ HomeWrapper >
            {isModal ? <Modal modalRef={this.modalRef} onClick={this.handleCloseModal} modalContent={modalContent} /> : null}
            </>
        );
    }
}
 
export default Home;