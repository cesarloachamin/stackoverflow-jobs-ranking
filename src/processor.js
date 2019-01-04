import cheerio from 'cheerio';

export default class Processor {

    constructor(requester) {
        this.requester = requester;
    }

    async processJobs() {
        const html = await this.requester.fetch();
        this.$ = cheerio.load(html);
        const that = this;
        return this.$('div.listResults>div')
            .map(function () {
                return that.processJobContainer(that.$(this));
            })
            .get();
    }

    processJobContainer(element) {
        return {
            title: this.text(element.find('h2')),
            company: this.text(element.find('div.-company>span')),
            date: this.text(element.find('div.-title>span')),
            perks: this.items(element.find('div.-perks>span')),
            tags: this.items(element.find('div.-tags>a'))
    }
    }

    text(element) {
        const that = this;
        return element.map(function () {
            return that.$(this).text().trim();
        }).get().join('');
    }

    items(elements) {
        const that = this;
        return elements.map(function () {
            return that.text(that.$(this));
        }).get();
    }
}