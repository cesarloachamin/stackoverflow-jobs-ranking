import Requester from './requester';
import Processor from './processor';
import Ranker from "./ranker";

const processor = new Processor(new Requester({query: 'docker', remote: true}));
processor.processJobs()
    .then(jobs => new Ranker(jobs))
    .then(ranker => console.log(ranker.getRankedTags()));





