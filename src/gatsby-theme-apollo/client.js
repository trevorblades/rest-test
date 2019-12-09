import fetch from 'isomorphic-fetch';
import {ApolloClient, HttpLink, InMemoryCache, gql} from '@apollo/client';

const typeDefs = gql`
  type Query {
    characters: [Character]
  }

  type Character {
    id: ID
    name: String
    species: String
    image: String
  }
`;

const client = new ApolloClient({
  fetch,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  }),
  typeDefs,
  resolvers: {
    Query: {
      async characters() {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character'
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const {results} = await response.json();
        return results.map(character => ({
          ...character,
          __typename: 'Character'
        }));
      }
    }
  }
});

export default client;
