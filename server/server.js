import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
  type Query {
    foo: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      foo: () => 'bar'
    }
  }
});

server.listen().then(({url}) => {
  console.log(`Server listening at ${url}`)
})
