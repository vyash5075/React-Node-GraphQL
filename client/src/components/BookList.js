import React ,{Component}from 'react'
import  {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
constructor(props){
    super(props);
    this.state={
        selected:null
    }
}
    displayBooks(){
    var data=this.props.data;
//console.log(data);
if(data.loading){
    return (<div>Loading...</div>)
}
else{
    return data.books.map((book,i)=>{
        return(<li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}}>{book.name}</li>)
    })
}   
}

render(){
    var data=this.props;
   // console.log(data.data.books);
    return (
       
        <div>
            <ul id="book-list">
             {this.displayBooks()}    
            </ul>
            <BookDetails bookid={this.state.selected}></BookDetails>
        </div>
    )
}
}
export default graphql(getBooksQuery)(BookList);  // where the data is stored which we fetch from query. well it stored in the component props
