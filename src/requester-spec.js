import Requester from './requester';

describe('Stackoverflow requester test', () => {

    it('should request the stackoverflow jobs url with the configuration', (done) => {
        const configuration = { query: 'Java', remote: true };
        const requester = new Requester(configuration);

        expect(requester._url).toBe('https://stackoverflow.com/jobs?q=Java&r=true');
        requester.fetch()
            .then(html => {
                expect(html).toContain('<html');
                done();
            });
    });
});