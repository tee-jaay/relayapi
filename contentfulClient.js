import contentful from 'contentful';

const spaceId = process.env.SPACE_ID;
const accessToken = process.env.ACCESS_TOKEN;
console.log(spaceId, accessToken);

export default contentful.createClient({
    space: 'a56nkt3d6e5p',
    accessToken: 'RTfMyYdwUa_l872vZS-5AxhhZHIc9kZjwxiEcqNsWRw',
});
