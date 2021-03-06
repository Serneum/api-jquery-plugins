/*jslint sloppy: true */
/*global config: false, describe: false, it: false, expect: false, beforeEach: false, afterEach: false, $: false, jasmine: false */

var config = {
    apiId: '1vd9o4427lyi0ccb2uem',
    version: 1
};

describe('PA Dashboard', function () {
    beforeEach(function () {
        jasmine.Ajax.install();

        $('body').append('<div id="dashboard"></div>');
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();

        $('#dashboard').remove();
    });

    it('displays a list of PAs', function () {
        jasmine.Ajax.stubRequest('https://api.covermymeds.com/requests/search?v=' + config.version).andReturn({
            status: '200',
            contentType: 'application/json',
            responseText: '{"requests":[{"memo":null,"api_id":"1vd9o4427lyi0ccb2uem","id":"PF6FK9","form_id":"humana_boniva_iv_25297","patient":{"first_name":"Northland","middle_name":null,"last_name":"Denmark","member_id":null,"phone_number":null,"date_of_birth":"01/01/1900","gender":null,"address":{"street_1":null,"street_2":null,"city":null,"state":"OH","zip":null}},"pharmacy":{"name":null,"phone_number":null},"payer":{"form_search_text":null,"bin":null,"pcn":null,"group_id":null,"medical_benefit_name":"","drug_benefit_name":null},"prescriber":{"npi":null,"first_name":null,"last_name":null,"clinic_name":null,"fax_number":null,"phone_number":null,"address":{"street_1":null,"street_2":null,"city":null,"state":"0","zip":null}},"prescription":{"drug_id":"094563","name":"Boniva 2.5MG tablets","strength":null,"frequency":null,"days_supply":null,"quantity":null,"rationale":null},"enumerated_fields":{"icd9_0":null,"icd9_1":null,"icd9_2":null,"failed_med_0":null,"failed_med_1":null,"failed_med_2":null,"failed_med_3":null,"failed_med_4":null,"failed_med_5":null,"failed_med_6":null,"failed_med_7":null,"failed_med_8":null,"failed_med_9":null},"is_epa":false,"href":"https://api.covermymeds.com/requests/PF6FK9","plan_outcome":null,"workflow_status":"New","thumbnail_urls":["thumbs"],"pdf_url":"https://www.covermymeds.com/request/send/PF6FK9/","html_url":"https://www.covermymeds.com/request/view/PF6FK9","created_at":"2014-02-21T22:48:41Z","state":"OH","urgent":null,"attachments_included":0,"response_from_plan":null,"tokens":[{"id":"gq9vmqai2mkwewv1y55x","request_id":"PF6FK9","href":"https://api.covermymeds.com/requests/tokens/gq9vmqai2mkwewv1y55x","html_url":"https://www.covermymeds.com/request/view/PF6FK9?token_id=gq9vmqai2mkwewv1y55x","pdf_url":"https://www.covermymeds.com/request/send/PF6FK9?token_id=gq9vmqai2mkwewv1y55x"},{"id":"ab9m6p5u1hbrxuwwoptw","request_id":"PF6FK9","href":"https://api.covermymeds.com/requests/tokens/ab9m6p5u1hbrxuwwoptw","html_url":"https://www.covermymeds.com/request/view/PF6FK9?token_id=ab9m6p5u1hbrxuwwoptw","pdf_url":"https://www.covermymeds.com/request/send/PF6FK9?token_id=ab9m6p5u1hbrxuwwoptw"},{"id":"1rgneu6wx67601xq9l6x","request_id":"PF6FK9","href":"https://api.covermymeds.com/requests/tokens/1rgneu6wx67601xq9l6x","html_url":"https://www.covermymeds.com/request/view/PF6FK9?token_id=1rgneu6wx67601xq9l6x","pdf_url":"https://www.covermymeds.com/request/send/PF6FK9?token_id=1rgneu6wx67601xq9l6x"},{"id":"sbgwbv204h4m7td3wvtx","request_id":"PF6FK9","href":"https://api.covermymeds.com/requests/tokens/sbgwbv204h4m7td3wvtx","html_url":"https://www.covermymeds.com/request/view/PF6FK9?token_id=sbgwbv204h4m7td3wvtx","pdf_url":"https://www.covermymeds.com/request/send/PF6FK9?token_id=sbgwbv204h4m7td3wvtx"}],"events":[]},{"memo":null,"api_id":"1vd9o4427lyi0ccb2uem","id":"PM7RQ3","form_id":"prime_therapeutics_general_1513","patient":{"first_name":"Justin","middle_name":null,"last_name":"Rolson","member_id":null,"phone_number":null,"date_of_birth":"01/01/1900","gender":null,"address":{"street_1":null,"street_2":null,"city":null,"state":"OH","zip":null}},"pharmacy":{"name":null,"phone_number":null},"payer":{"form_search_text":null,"bin":null,"pcn":null,"group_id":null,"medical_benefit_name":"","drug_benefit_name":null},"prescriber":{"npi":null,"first_name":null,"last_name":null,"clinic_name":null,"fax_number":null,"phone_number":null,"address":{"street_1":null,"street_2":null,"city":null,"state":"0","zip":null}},"prescription":{"drug_id":"094563","name":"Boniva 2.5MG tablets","strength":null,"frequency":null,"days_supply":null,"quantity":null,"rationale":null},"enumerated_fields":{"icd9_0":null,"icd9_1":null,"icd9_2":null,"failed_med_0":null,"failed_med_1":null,"failed_med_2":null,"failed_med_3":null,"failed_med_4":null,"failed_med_5":null,"failed_med_6":null,"failed_med_7":null,"failed_med_8":null,"failed_med_9":null},"is_epa":false,"href":"https://api.covermymeds.com/requests/PM7RQ3","plan_outcome":null,"workflow_status":"New","thumbnail_urls":["thumbs"],"pdf_url":"https://www.covermymeds.com/request/send/PM7RQ3/","html_url":"https://www.covermymeds.com/request/view/PM7RQ3","created_at":"2014-02-24T15:19:23Z","state":"OH","urgent":null,"attachments_included":0,"response_from_plan":null,"tokens":[{"id":"33lhqakhtmas8r965w39","request_id":"PM7RQ3","href":"https://api.covermymeds.com/requests/tokens/33lhqakhtmas8r965w39","html_url":"https://www.covermymeds.com/request/view/PM7RQ3?token_id=33lhqakhtmas8r965w39","pdf_url":"https://www.covermymeds.com/request/send/PM7RQ3?token_id=33lhqakhtmas8r965w39"}],"events":[{"time":"2014-04-22T17:52:23Z","type":"DELETE","remote_user":{}}]},{"memo":null,"api_id":"1vd9o4427lyi0ccb2uem","id":"GN7HQ2","form_id":"medco_esi_bisphosphonates_oral_form_21091","patient":{"first_name":"Vasanth","middle_name":null,"last_name":"Pappu","member_id":null,"phone_number":null,"date_of_birth":"01/01/1900","gender":null,"address":{"street_1":null,"street_2":null,"city":null,"state":null,"zip":null}},"pharmacy":{"name":null,"phone_number":null},"payer":{"form_search_text":null,"bin":null,"pcn":null,"group_id":null,"medical_benefit_name":"","drug_benefit_name":null},"prescriber":{"npi":null,"first_name":null,"last_name":null,"clinic_name":null,"fax_number":null,"phone_number":null,"address":{"street_1":null,"street_2":null,"city":null,"state":"0","zip":null}},"prescription":{"drug_id":"094563","name":"Boniva 2.5MG tablets","strength":null,"frequency":null,"days_supply":null,"quantity":null,"rationale":null},"enumerated_fields":{"icd9_0":null,"icd9_1":null,"icd9_2":null,"failed_med_0":null,"failed_med_1":null,"failed_med_2":null,"failed_med_3":null,"failed_med_4":null,"failed_med_5":null,"failed_med_6":null,"failed_med_7":null,"failed_med_8":null,"failed_med_9":null},"is_epa":false,"href":"https://api.covermymeds.com/requests/GN7HQ2","plan_outcome":"Favorable","workflow_status":"Archived","thumbnail_urls":["thumbs"],"pdf_url":"https://www.covermymeds.com/request/send/GN7HQ2/","html_url":"https://www.covermymeds.com/request/view/GN7HQ2","created_at":"2014-02-24T15:19:38Z","state":"OH","urgent":null,"attachments_included":0,"response_from_plan":null,"tokens":[{"id":"s4c85zi3ku0b9re5sg1o","request_id":"GN7HQ2","href":"https://api.covermymeds.com/requests/tokens/s4c85zi3ku0b9re5sg1o","html_url":"https://www.covermymeds.com/request/view/GN7HQ2?token_id=s4c85zi3ku0b9re5sg1o","pdf_url":"https://www.covermymeds.com/request/send/GN7HQ2?token_id=s4c85zi3ku0b9re5sg1o"}],"events":[{"time":"2014-07-09T18:12:02Z","type":"DELETE","remote_user":{}}]}]}'
        });

        $('#dashboard').dashboard({
            apiId: config.apiId,
            version: config.version,
            tokenIds: ['gq9vmqai2mkwewv1y55x', '33lhqakhtmas8r965w39', 's4c85zi3ku0b9re5sg1o']
        });

        _.defer(function () {
            expect($('table.requests').find('tr').length).not.toBe(0);
        });
    });
});
