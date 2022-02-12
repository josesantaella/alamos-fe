import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query Articles($locale: String!) {
    articles(locale: $locale) {
      id
      title
      content
      description
      created_at
      updated_at
      published_at
      image {
        url
        width
        height
      }
      slug
      category {
        name
      }
      author {
        name
      }
      localizations {
        id
        slug
        locale
      }
      locale
    }
  }
`;
export const GET_BY_SLUG = gql`
  query Articles($slug: String!, $locale: String!) {
    articles(locale: $locale, limit: 1, where: { slug: $slug }) {
      id
      title
      content
      description
      created_at
      updated_at
      published_at
      image {
        url
        width
        height
        blurHash
      }
      slug
      category {
        name
      }
      author {
        name
      }
      localizations {
        id
        slug
        locale
      }
      locale
    }
  }
`;
export const GET_ALL_SLUG = gql`
  query Articles($locale: String!) {
    articles(locale: $locale) {
      slug
      localizations {
        id
        slug
        locale
      }
      locale
    }
  }
`;
