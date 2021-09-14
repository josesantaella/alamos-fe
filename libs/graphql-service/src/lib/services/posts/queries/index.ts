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
`

export const GET = `
query Articles($id: ID!) {
    articles(limit :1 , where: { id : $id} )  {
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
  `
export const GET_ALL_ID = `
  query {
    articles{
      id
    }
  }
  `
