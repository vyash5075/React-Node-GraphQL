const express=require('express');
const { graphqlHTTP }=require('express-graphql');
const schema=require('./schema/schema')
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');


app.use(cors());


//connect to mongoose
mongoose.connect('mongodb+srv://admin:admin@cluster0.iubmt.mongodb.net/graphqlpractice?retryWrites=true&w=majority')
    mongoose.connection.once('open',()=>{
    console.log("connected to database");
})

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))
app.listen(4000,()=>{
    console.log("now listening for request on port 4000");
})
