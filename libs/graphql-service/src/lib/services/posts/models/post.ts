class Post {
    id: number
    title: string
    content : string
    description : string
    created_at: string
    updated_at: string
    published_at: string
    image: {
        url : string
    }
    slug : string
    category: {
        name: string
    }
    author: {
        name : string
    }
}

export default Post