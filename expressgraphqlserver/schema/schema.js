const graphql=require('graphql');
const _=require('lodash');
const Book=require('../models/book');
const Author=require('../models/author');
const author = require('../models/author');
//our schema will describe the data on this kind of graph . it describes the object types the relations between those oject types   and it  describes how we reach into the graph interact with the data 
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLNonNull,GraphQLID,GraphQLInt,GraphQLList}=graphql;   // hamne graphql package se GraphQLObjectType manga hai
//dummy data
var books=[
    {name:'Life behind the steering wheel',genre:'Fantasy',id:'1',authorId:'1'},
    {name:'the final empire',genre:'fantasy',id:'2',authorId:'2'},
    {name:'the long earth',genre:'sci-fri',id:'3',authorId:'3'},
    {name:'the  earth',genre:'sci-fri',id:'4',authorId:'2'},
    {name:'the long',genre:'sci-fri',id:'5',authorId:'1'},
    {name:' long earth',genre:'sci-fri',id:'6',authorId:'3'}
];

var authors=[
    {name:'Yash ',age:44,id:'1'},
    {name:'Jasmine',age:45,id:'2'},
    {name:'yasmine',age:46,id:'3'}
];




//define a new type
const BookType= new GraphQLObjectType({     //ye curly braces me jo object h vo return ho rha h is function ke andr .
                                                // new way to return 
    name:'Book',   
    fields:()=>({                       // same as yaha bhi object return ho rha hai
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:Authortype,
            resolve(parent,args){
                    return Author.findById(parent.authorId)
                //return  _.find(authors,{id:parent.authorId});
            }
        }
    })
})    


const Authortype=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.FindById({authorId:parent.id})
             //   return _.filter(books,{authorId:parent.id})
            }
        }
    })
});


const Mutation=new GraphQLObjectType({
name:"mutations",
fields:{
    addAuthor:{
        type:Authortype,
        args:{
            name:{type:new GraphQLNonNull(GraphQLString)},
            age:{type:new GraphQLNonNull (GraphQLInt)}
            
        },
        resolve (parent,args)
        {
            let author =new Author({
                name:args.name,
                age:args.age
            });
           return author.save()
        }
    },
    addBook:{
        type:BookType,
        args:{
            name:{type:new GraphQLNonNull(GraphQLString)},
            genre:{type:new GraphQLNonNull(GraphQLString)},
            authorId:{type:new GraphQLNonNull(GraphQLID)}

        },
        resolve(parent,args)
        {
            let book=new Book({
                name:args.name,
                genre:args.genre,
                authorId:args.authorId
            });
            return book.save();
        }
    }
}
})


const RootQuery=new GraphQLObjectType({
name:'RootQueryType',
fields:{
    book:{
        type:BookType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            return Book.findById(args.id);
            //code to get data from db/other source
            //args.id
          // return  _.find(books,{id:args.id});
        }
    },
    author:{
        type:Authortype,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            return Author.findById(args.id);
            
            //code to get data from db/other source
            //args.id
          // return  _.find(authors,{id:args.id});
        }
    },
    books:{
        type:new GraphQLList(BookType),
        resolve(parent,args){
            return Book.find({});
            //return books
        }
    },
    authorss:{
        type:new GraphQLList(Authortype),
        resolve(parent,args){
            //return authors
            return author.find({

            })
        }
    },
    
}
});
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})