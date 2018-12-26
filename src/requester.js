import request from 'request';

const baseUrl = 'https://stackoverflow.com/jobs';

export default function (parameters) {
    const query = createQueryString(parameters);
    const url = `${baseUrl}?${query}`;
    console.debug(`Request GET to url ${url}`);
    return new Promise((resolve, reject) =>
        request(url, (error, response, body) => {
            if (error) reject(error);
            resolve(body);
        }));
};

const createQueryString= (parameters) => {
    const query = [];
    if (parameters.query) {
        query.push(`q=${parameters.query}`);
    }
    if (parameters.remote) {
        query.push(`r=${parameters.remote}`);
    }
    return query.join('&');
};


