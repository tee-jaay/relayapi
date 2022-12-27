import contentful from 'contentful';

export default contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.CONTENT_DELIVERY_API_ACCESS_TOKEN,
});
