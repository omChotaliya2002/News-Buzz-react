import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import LoadingBar from 'react-top-loading-bar';

export class News extends Component {

    static defaultProps = {
        country : "us",
        pageSize : 9,
        category : "general"    
    }

    static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,
    }
 
    capitalize = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);  // function to capitalize first letter
    }

  constructor(props){
    super(props);
    this.state = {
          articles : [],           // set the state of article same as above array
          loading : false,
          page : 1,
          totalResults : 0
    }
      document.title =  `${this.capitalize(this.props.category)} - NEWS Buzz`;   // changing the title as per news category
      
  }

  // FUNCTION FOR FETCHING DATA FROM NEWS API :

    async updateNews(page) {
      
      this.props.setProgress(10);            // set initaial progress to 10
      this.setState({loading : true});      // show loading before fetching

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=331f4c3cb4d246e9b583d69f7eb662a8&page=${page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);      //then(res => console.log(Object.fromEntries(res.headers.entries())));

      this.props.setProgress(50);           //set progress 50 after data fetching
      let parsedData = await data.json();
      this.props.setProgress(80);           // set progress 80 after data parsing

      this.setState({
        articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading : false,
        page : page
      });
        
        this.props.setProgress(100);          //set progress to 100 after fetching all data        
        window.scrollTo({top:0, behavior:"smooth"});      //scroll to top 

    }

 async componentDidMount(){
      this.updateNews(this.state.page);
  }


  handlePreviousClick = async () => {
  
    if(this.state.page > 1){  
        this.updateNews(this.state.page - 1);
    }
  }; 

  handleNextClick = async () => {
    // console.log("next");
      if(this.state.page + 1 <= Math.ceil(this.state.totalResults/this.props.pageSize)) {     // Ex. totalResult = 120/20
          this.updateNews(this.state.page + 1);
      }          
  };


  render() { 
    return (

<> 
        <h1 className='text-center' style={{color:"black", marginTop : "100px"}}>
          NEWS Buzz - Top {this.capitalize(this.props.category)} Headlines </h1> <br/>

        {this.state.loading && <Spinner/>}   {/*when loading is true then image will shown*/}


    <div className="container"> 

      <div className="row">

          {this.state.articles?.map((element)=> {

            return <div className="col-md-4" key={element.url} >
               <NewsItem title={element.title} 
               description={element.description} 
               imageUrl={element.urlToImage} 
               newsUrl={element.url}
               author={element.author}
               date = {element.publishedAt}
               source = {element.source.name}/>
              
               </div>
          })}
         
      </div> 

            <div className='container d-flex justify-content-between'> 
                    <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled={this.state.page <= 1}
                    style={{width: "120px",height : "50px",marginBottom : "40px",fontWeight : "bold", fontSize : "17px"}}> &larr; Previous </button>

                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)}    
                    style={{width : "120px",height : "50px",marginBottom : "40px",fontWeight : "bold", fontSize : "17px"}}>  Next &rarr; </button>
            </div>
    </div>
</>
    )
  }
}
export default News;


  // fetchData = async() => {
          
  //       if(this.state.articles.length >= this.state.totalResults){
  //           return;         // stop fetchign if all articles are loaded
  //       }

  //       this.setState({page : this.state.page + 1}, async() => {
  //             let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=331f4c3cb4d246e9b583d69f7eb662a8&pageSize=${this.props.pageSize}`;
  //             let data = await fetch(url);
  //             let parsedData = await data.json;

  //             this.setState({
  //                 articles : this.state.articles.concat(parsedData.articles),
  //                 totalResults : parsedData.totalResults,
  //                 loading : false
  //             });
  //         });
  //     };


  {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}> */}
{/* </InfiniteScroll> */}
