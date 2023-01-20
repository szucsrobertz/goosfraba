import { gql } from '@apollo/client';

export const getAllPosts = gql`
  query AllPosts($count: Int!) {
    allPosts(count: $count) {
      id
      title
      body
      published
      createdAt
    }
  }
`;
