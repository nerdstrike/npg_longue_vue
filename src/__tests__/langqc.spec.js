import LangQc from '../langQc.js';

test(
    'Constructing LangQC client',
    () => {
        let client = new LangQc('https://niceplace.test');
        expect(client).toBeDefined();

        expect(client.urls.inbox.toString()).toEqual('https://niceplace.test/pacbio/inbox?weeks=1');
        expect(client.urls.run.toString()).toEqual('https://niceplace.test/pacbio/run');

        expect(() => {new LangQc()}).toThrow('LangQc client must know where the web service is');
    }
);

test(
    'Claiming',
    () => {
        let client = new LangQc('https://niceplace.test');

        expect(() => {client.claimWell('TRACTION-123', 'A1')}).toThrow('Not implemented');
    }
);
