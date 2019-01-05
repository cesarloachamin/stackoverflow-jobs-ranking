import Ranker from "./ranker";

describe('Ranker Test', () => {

    it('should rank jobs', () => {
        const jobs = [
            {tags: ['java', 'spring', 'react']},
            {tags: ['javascript', 'react',]},
            {tags: ['aws', 'spring',]},
            {tags: ['java', 'spring']}
        ];

        const ranker = new Ranker(jobs);
        const tags = ranker.getRankedTags();

        expect(tags.length).toEqual(5);
        expect(tags).toEqual([
            {tag: 'spring', rank: 3},
            {tag: 'java', rank: 2},
            {tag: 'react', rank: 2},
            {tag: 'aws', rank: 1},
            {tag: 'javascript', rank: 1}]);
    });

});