import "core-js/fn/array/flatten";

export default class Ranker {

    constructor(jobs) {
        this.tags = {};
        this._rankTags(jobs);
    }

    _rankTags(jobs) {
        this.tags = jobs.map(job => job.tags).flatten()
            .reduce((object, tag) => {
                object[tag] = object[tag] ? object[tag] + 1 : 1;
                return object;
            }, {});
    }

    getRankedTags() {
        return Object.keys(this.tags)
            .map(key => ({tag: key, rank: this.tags[key]}))
            .sort((a, b) => {
                if (a.rank > b.rank) return -1;
                if (a.rank < b.rank) return 1;
                if (a.tag > b.tag) return 1;
                if (a.tag < b.tag) return -1;
            });
    }
}