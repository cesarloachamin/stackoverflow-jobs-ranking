import request from 'request';

const baseUrl = 'https://stackoverflow.com/jobs';

export default class Requester {

    constructor(configuration) {
        this.generateUrlFrom(configuration);
    }

    generateUrlFrom(configuration) {
        const query = [];
        if (configuration.query) {
            query.push(`q=${configuration.query}`);
        }
        if (configuration.remote) {
            query.push(`r=${configuration.remote}`);
        }
        const querystring = query.join('&');
        this._url = `${baseUrl}?${querystring}`;
    }

    fetch() {
        console.log(`Fetching from url: ${this._url}`);
        return new Promise((resolve, reject) =>
            request(this._url, (error, response, body) => {
                if (error) reject(error);
                resolve(body);
            }));
    }
}
