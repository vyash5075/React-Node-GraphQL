import React from 'react'
import {graphql } from 'react-apollo';
//import{getBookQuery} from '../queries/queries';
import  {gql} from 'apollo-boost';

const getBookQuery=gql`
query getBookQuery($id:ID){
    book(id:$id){
        id
        name
        genre
        author{
            name
           id
          }

    }
}
`
const BookDetails = (props) => {
    console.log(props)


    function displaybookdetails(){
       
        const book=props.data.book;
        console.log(book);
        if(book)
        {
            return(
                <div>
                    <h2>Name:{book.name}</h2>
                    <h2>Genre:{book.genre}</h2>
                    <h2>By: {book.author.name}</h2>
                    <p>All books by this author</p>
                    {/* <ul className="other-books">
                        {book.author.books.map(item=>{
                            return <li key={item.id}>{item.name}</li>
                        })}
                        </ul>                   */}
                </div>
            )
        }
        else{
            return(
                <div>No Book selected....</div>
            )
        }
         
    }
    return (
        <div id='book-details'>
           {displaybookdetails()}

            
        </div>
    )
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return {
            variables :{
                id:props.bookid
            }
        }
    }
})(BookDetails);
