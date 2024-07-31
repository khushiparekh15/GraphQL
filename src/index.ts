import express, { query } from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware}  from '@apollo/server/express4';
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { default: axios } = require('axios');

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

//Create GraphQL Server
async function init() {
    const gqlServer = new ApolloServer({
        typeDefs:`
        type Query {
         hello: String
         say(name: String): String
         }
        `, //Schema
        resolvers:{
            Query: {
                hello: () => `Hey there, I am a graphql server`,
                say: (_, {name}: {name: String} ) => ` hey ${name}, How are you?`
            },
        },
});

//Start the gqlServer..
await gqlServer.start();

app.get("/",(req,res) =>{
    res.json({message: "Server is up and running"});
});

app.use("/graphql",expressMiddleware(gqlServer));

app.listen(PORT,()=> console.log(`Server started at PORT:${PORT}`));
}
init();