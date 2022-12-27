import contentful from 'contentful-management';

export default contentful.createClient({
    accessToken: process.env.PERSONAL_ACCESS_TOKEN
});