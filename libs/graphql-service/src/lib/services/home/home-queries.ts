export const GET = `
query {
    homepage {
        seo {
            metaTitle,
            metaDescription,
            shareImage {
                url
                width
                height
            }
        }
        hero {
            title
        }
    }
}
`;
