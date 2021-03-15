import { gql } from '@apollo/client';

export const GET_NEWS_QUERY = gql`
  query ($userId: ID) {
    posts {
      getNews(userId: $userId) {
        _id
        date
        likes
        title
        text
        picture
        video
        owner
      }
    }
  }
`;