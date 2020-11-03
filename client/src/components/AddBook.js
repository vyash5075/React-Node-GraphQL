import React ,{Component}from 'react'
import {flowRight as compose} from 'lodash';
import {graphql} from 'react-apollo';
import { getauthorsQuery,addBookMutation} from '../queries/queries';
import {getBooksQuery} from '../queries/queries'; 

// const  getauthorsQuery=gql`
// {
//     authorss{
//         name
//         id 
//     }
// }` 
class AddBook extends Component {

 constructor(props){
     super(props);
     this.state={ 
         name:'',
         genre:'',
         authorId:''
     }
 }

   
displayAuthors(){
    console.log("..........................................");
    console.log(this.props);
    let data = this.props.getauthorsQuery;
   
    if(data.loading)
    {
        return (<option>Loading....</option>)
    }
    else{
            return data.authorss.map((author,i)=>{

                return (console.log("......."+author.id),
                <option key={author.id} value={author.id}>{author.name}</option>)
            })
    }
}
 
  change(e){}
submitform(e){
    e.preventDefault();
   this.props.addBookMutation({
       variables:{
           name:this.state.name,
           genre:this.state.genre,
           authorId:this.state.authorId
       },
       refetchQueries:[{query:getBooksQuery}]  //jaise hi ek component me change ho toh agle component me sath sath change ho jaye
   });
}

render(){
   
    return (
       
       <form id="field" onSubmit={this.submitform.bind(this)}>
           <div className="field">
               <label>Book Name:</label>
               <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
           </div>
           <div className='field'>
               <label>Genre:</label>
               <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
           </div>
           <div className='field'>
               <label>Author:</label>
               <select onChange={(e)=>this.setState({authorId:e.target.value})}>
                   <option>Select author</option>
                   {this.displayAuthors()}
               </select>
           </div>
           <button>+</button>
       </form>
    );
}
}

export default compose(
    graphql(getauthorsQuery,{name:'getauthorsQuery'}),
    graphql(addBookMutation,{name:'addBookMutation'})
)(AddBook);