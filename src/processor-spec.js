import Requester from "./requester";
import Processor from "./processor";

describe('Processor test', function () {

    const html = `
        <div class="listResults">
            <div data-jobid="226911" class="-item -job p24 pl48 bb ps-relative bc-black-2 js-dismiss-overlay-container">    
                <div class="dismiss-trigger js-dismiss-job ps-absolute r12 fc-black-500 c-pointer" data-id="226911" data-referrer="JobSearch" title="Dismiss job">        
                </div>
                <div class="-job-summary">
                    <div class="-title">
                    <span data-href="/jobs/togglefavorite/226911?referrer=JobSearch&amp;sec=False" data-jobid="226911"
                          class="fav-toggle ps-absolute l16 c-pointer js-fav-toggle "
                          title="Click to add this job to your favorites."
                          data-ga-label="ViaBill A/S | Senior Java Backend Developer with accounting domain experience | 226911"
                          )="">            
                    </span>
                        <h2 class="fs-subheading job-details__spaced mb4">
                            <a href="/jobs/226911/senior-java-backend-developer-with-accounting-viabill-a-s?a=1e68dsoYR2us&amp;so=i&amp;pg=1&amp;offset=1&amp;total=968"
                               title="Senior Java Backend Developer with accounting domain experience"
                               class="s-link s-link__visited">Senior Java Backend Developer with accounting domain experience</a>
                        </h2>
                        <span class="ps-absolute pt2 r0 fc-black-500 fs-body1 pr12 t24">7h ago</span>
                    </div>
                    <div class="fc-black-700 fs-body2 -company">
                    <span>ViaBill A/S
                    </span>
                        <span class="fc-black-500">-No office location</span>
                    </div>
                    <div class="mt2 -perks">
                        <span class="-remote pr16">Remote</span>
                    </div>
                    <div class="mt12 -tags">
                        <a href="/jobs/developer-jobs-using-java" class="post-tag job-link no-tag-menu">java</a><a
                            href="/jobs/developer-jobs-using-accounting" class="post-tag job-link no-tag-menu">accounting</a><a
                            href="/jobs/developer-jobs-using-spring-boot" class="post-tag job-link no-tag-menu">spring-boot</a><a
                            href="/jobs/developer-jobs-using-mariadb" class="post-tag job-link no-tag-menu">mariadb</a>
                    </div>
                </div>
            </div>
        </div>`;

    it('should process the mock html from the requester', async () => {
        const requester = new Requester({});
        const processor = new Processor(requester);
        spyOn(requester, 'fetch').and.returnValue(Promise.resolve(html));

        const jobs = await processor.processJobs();

        expect(jobs).toBeDefined();
        expect(jobs.length).toEqual(1);

        const job = jobs[0];
        expect(job.title).toEqual('Senior Java Backend Developer with accounting domain experience');
        expect(job.company).toEqual('ViaBill A/S-No office location');
        expect(job.date).toEqual('7h ago');
        expect(job.perks).toEqual(['Remote']);
        expect(job.tags).toEqual(['java', 'accounting', 'spring-boot', 'mariadb']);
        expect(job.url).toEqual('https://stackoverflow.com/jobs/226911/senior-java-backend-developer-with-accounting-viabill-a-s?a=1e68dsoYR2us&so=i&pg=1&offset=1&total=968')
    });

    it('should process the html from the requester', async () => {
        const requester = new Requester({});
        const processor = new Processor(requester);

        const jobs = await processor.processJobs();

        expect(jobs).toBeDefined();
        expect(jobs.length).toBeGreaterThan(1);
    });

});