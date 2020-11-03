import React from 'react';
import './App.css';
import Booklist from './components/BookList'
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';//binding apollo to react 

//client setup
const client=new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}> 
    {/* taling the data from apollo what we receive from the server and inject in the wrapped elements. */}
    <div id="main">
      <h1>Ninja's Reading List</h1>
      <Booklist/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
