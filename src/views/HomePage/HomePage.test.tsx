import { ApolloProvider } from '@apollo/client';
import { client } from 'graphqlClient';
import React from 'react';
import renderer from 'react-test-renderer';

import HomePage from './HomePage';

it('render the appropiate text when the data is not loaded', () => {
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <HomePage />
      </ApolloProvider>
    )
    .toJSON();
  expect(tree.children[0].children).toContain('The data is loading');
});
