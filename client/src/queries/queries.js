import  {gql} from 'apollo-boost';
const  getauthorsQuery=gql`
{
    authorss{
        name
        id 
    }
}` 

const  getBooksQuery=gql`
{
    books{
        name
        id 
    }
}`
const addBookMutation=gql`
mutation($name:String!,$genre:String!,$authorId:ID!){         

    addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        id
        genre
    }
}
`



export {getauthorsQuery,getBooksQuery,addBookMutation};