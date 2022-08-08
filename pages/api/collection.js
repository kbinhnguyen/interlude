const { ApolloServer, gql } = require('apollo-server');

// Maybe move both schema and resolvers to other files for separation of concerns
// Define schema
const typeDefs = gql``;

// Define resolver functions
const resolvers = {

};


// Create server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen({
  host: '/api/collection'
})
  .then(( { url }) => {
    console.log(`ApolloServer ready at ${url}`);
  })
  .catch((err) => { console.log(err); });