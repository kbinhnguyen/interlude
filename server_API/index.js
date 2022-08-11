const { ApolloServer } = require('apollo-server');
const typeDefs = require('./controller/schema');
const resolvers = require('./controller/resolvers');

require('dotenv').config();

// Create server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen({
  port: process.env.API_SERVER_PORT || 4320,
})
  .then(({ url }) => {
    console.log(`ApolloServer ready at ${url}`);
  })
  .catch((err) => { console.log(err); });
