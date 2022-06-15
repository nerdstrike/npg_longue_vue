import { join } from "lodash";

export default class LangQc {
    constructor(host) {
        this.host = host;

        this.urls = {
            inbox: this.buildUrl('pacbio/inbox', ['weeks=1']),
            run: this.buildUrl('pacbio/run', [])
        };
        this.commonHeaders = {
            'Accept': 'application/json',
            'Origin': 'https://*.dnapipelines.sanger.ac.uk',
            'access-control-allow-origin': 'https://*.dnapipelines.sanger.ac.uk'
        };
    }

    buildUrl(path, args) {
        let data_service = new URL(this.host);
        data_service.pathname = path;

        data_service.search = '?' + join(args, "&");
        return data_service;
    }

    getUrl(alias) {
        return this.urls[alias].href;
    }

    getInboxPromise() {
        return fetch(
            this.getUrl('inbox'),
            {
                headers: this.commonHeaders
            }
        ).then(
            response => response.json()
        ).catch(
            (error) => {
                console.log("Why are errors hard?");
                console.log(error);
            }
        );
    }

    getRunWellPromise(name, well) {
        return fetch(
            this.buildUrl('pacbio/run', ['run_name='+name, 'well_label='+well]),
            {
                headers: this.commonHeaders
            }
        ).then(
            response => response.json()
        );
    }

    claimWell(name, well) {
        throw('Not implemented');
    }
}
