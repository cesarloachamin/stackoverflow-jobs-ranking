import requester from './requester';

requester({ query: 'Java', remote: true }).then(html => console.log(html));



