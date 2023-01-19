import React from 'react';
import { useQuery, gql } from '@apollo/client';

import './App.css';

const getPosts = gql`
  query AllPosts($count: Int!) {
    allPosts(count: $count) {
      title
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(getPosts, {
    variables: { count: 10 },
  });

  console.log(data);
  return <div className='App'></div>;
}

export default App;
