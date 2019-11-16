import React, {Component} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import HomeWrapper from 'components/HomeWrapper/HomeWrapper';
import List from 'components/List/List';
import Loading from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';
import HeroSection from 'components/HeroSection/HeroSection';
import Search from 'components/Search/Search';




class Home extends Component {
    state = { 
        currentPage:1,
        isModal: false,
        listOfGames: [],
        modalContent: '',
        pageSize: 12,
        hasMoreToInfinityScroll: true,
        searchValue: '',
        isSearching:'',
     }
    
     modalRef = React.createRef();
     searchInputRef = React.createRef();

    componentDidMount(){
        this.getInitData();
        
    }


    getInitData =()=>{
        const timer = setTimeout(() => {
        const {currentPage, pageSize} =this.state;
        
        axios
        .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
        .then((response) => {
            console.log(response)
            const listOfGames=response.data.results;
            const {currentPage}=this.state
            this.setState({
                currentPage: currentPage+1,
                hasMoreToInfinityScroll: true,
                listOfGames
            })
          })
        }, 500);
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

    FetchMoreData = () => {
        const { currentPage, pageSize } = this.state;
        this.setState({ 
            currentPage: currentPage + 1
        }, ()=>{
            const timer = setTimeout(() => {
                axios
                .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
                .then(response =>
                    this.setState({ 
                        listOfGames: [...this.state.listOfGames].concat(response.data.results)
                    })
                ).catch(err=>console.log(err))
                
            }, 400);
    
            return () => {
                clearTimeout(timer);
            };
        });

 
 
      };



    handleSearch = (e) =>{
        window.scrollTo(0, 0);
        const searchInputFromRef=this.searchInputRef.current.value;
        
        this.setState({
            searchValue: searchInputFromRef,
            currentPage:1
        },()=>{
                
            const timerForSearch = setTimeout(() => {

                if(searchInputFromRef!==''){

                    let searchInputFromState=this.state.searchValue;

                    if(searchInputFromState===searchInputFromRef){
                        const query=`https://api.rawg.io/api/games?search=${searchInputFromState}&page_size=20&ordering=-rating`
                        axios
                        .get(query)
                        .then(response =>
                            {
                                this.setState({
                                    listOfGames: response.data.results,
                                    hasMoreToInfinityScroll: false
                                })
                            }
                        );
                    }
                }else{
                    this.getInitData();
                }
    
            }, 500);
            return () => {
                clearTimeout(timerForSearch);
            };
        })
    }




    addGameToFavList=(e, selectedGame)=>{
        const listOfyourFavGames= localStorage.getItem('favGames');
        let yourFavGame= selectedGame;
        yourFavGame.YourComment="";
        console.log(yourFavGame);

        
        let arrayToYourFavGames=[];
        arrayToYourFavGames=arrayToYourFavGames.concat(yourFavGame)

        if(listOfyourFavGames===null){
            // localStorage.setItem('favGames', []);


            /// setter
            localStorage.setItem('favGames', JSON.stringify(arrayToYourFavGames));

            
            
        }else{
            let a=localStorage.getItem('favGames')
            a=JSON.parse(a)
            a.concat(yourFavGame)
            /// setter
            localStorage.setItem('favGames', JSON.stringify(a));
        }

        let a=localStorage.getItem('favGames')
        a=JSON.parse(a)
        console.log(a)
        

        console.log(listOfyourFavGames)
        

    }







    render() { 
   
           //   crop/600/400
        const { isModal, isSearching, modalContent, listOfGames}=this.state;

        return (
            <>
            <HeroSection />
            <Search searchInputRef={this.searchInputRef} onChange={this.handleSearch} />

            <HomeWrapper>    
                <InfiniteScroll
                    dataLength={listOfGames.length}
                    next={this.FetchMoreData}
                    
                    hasMore={this.state.hasMoreToInfinityScroll}
                    loader={<Loading />}
                >
                 
                    <List onClick={this.handleShowModal} isModal={isModal} data={listOfGames}  />
                  
                    

                </InfiniteScroll>
                
            </ HomeWrapper >
            {isModal ? <Modal addFavGame={this.addGameToFavList} modalRef={this.modalRef} onClick={this.handleCloseModal} modalContent={modalContent} /> : null}
            </>
        );
    }
}
 
export default Home;