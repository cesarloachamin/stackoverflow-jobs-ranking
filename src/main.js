import Requester from "./requester";

const requester = new Requester({ query: 'Java', remote: true });
requester.fetch().then(html => console.log(html));



