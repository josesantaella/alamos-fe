export const GET_ALL = `
query {
    articles {
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
    }
}
`;

export const GET = `
query($id: ID!) {
    article(id : $id) {
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
    }
  }
  `;
  export const GET_ALL_ID = `
  query {
    articles{
      id
    }
  }
  `;