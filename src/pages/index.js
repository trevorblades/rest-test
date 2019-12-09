import React from 'react';
import {gql, useQuery} from '@apollo/client';

const LIST_CHARACTERS = gql`
  {
    characters @client {
      id
      name
      species
      image
    }
  }
`;

export default function Home() {
  const {data, loading, error} = useQuery(LIST_CHARACTERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data.characters.length) {
    return <p>No characters found</p>;
  }

  return (
    <ul>
      {data.characters.map(character => (
        <li
          key={character.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1em 0'
          }}
        >
          <img
            src={character.image}
            style={{
              width: 40,
              height: 40,
              marginRight: 16,
              borderRadius: '50%'
            }}
          />
          <div>
            <div style={{marginBottom: 4}}>{character.name}</div>
            <small>{character.species}</small>
          </div>
        </li>
      ))}
    </ul>
  );
}
