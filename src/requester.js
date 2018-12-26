import request from 'request';

const baseUrl = 'https://stackoverflow.com/jobs';

export default class Requester {

    static async fetch(parameters) {
        const query = Requester.createQueryString(parameters);
        const url = `${baseUrl}?${query}`;
        return await request(url);
    }

    static createQueryString(parameters) {
        const query = [];
        if (parameters.query) {
            query.push(`q=${parameters.query}`);
        }
        if (parameters.remote) {
            query.push(`r=${parameters.remote}`);
        }
        return query.join('&');
    }
    
}