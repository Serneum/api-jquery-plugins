/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global Hogan: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, _: false */
(function ($) {
    $.fn.extend({
        formSearch: function (options) {
            options = options || {};

            if (options === 'destroy') {
                return this.each(function () {
                    $(this).select2('destroy');
                    $(this).off('select2-selecting');
                });
            }

            formFormatResult = function (form) {
                var markup;

                markup = "<table class='table'>";
                markup += "<tr>";
                markup += "<td><img src='" + form.thumbnail_url + "' /></td>";
                markup += "<td>" + form.text + "</td>";
                markup += "</tr>";
                markup += "</table>";

                return markup;
            };

            return this.each(function () {
                var onSelected,
                    defaultUrl,
                    self;

                self = this;
                defaultUrl = 'https://staging.api.covermymeds.com/forms?v=' + CMM_API_CONFIG.version;


                // Initialize typeahead.js
                $(this).select2({
                    placeholder: 'Plan, PBM, Form name, BIN, or Contract ID',
                    minimumInputLength: 4,
                    quietMillis: 250,
                    ajax: {
                        url: options.url ? options.url : defaultUrl,
                        transport: function (params) {
                            if (options.url) {
                                return;
                            }
                            params.beforeSend = function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret));
                            }

                            return $.ajax(params);
                        },
                        data: function (term, page) {
                            var state,
                                drugId;

                            state = options.state || $('select[name="request[state]"]').val();
                            drugId = options.drugId || $('input[name="request[drug_id]"]').data('drug-id');

                            return {
                                q: term,
                                state: state,
                                drug_id: drugId
                            };
                        },
                        results: function (data, page) {
                            var results = [], more;

                            more = (page * 10) < data.total;
                            for (i = 0, j = data.forms.length; i < j; i += 1) {
                                results.push({
                                    id: data.forms[i].request_form_id,
                                    text: data.forms[i].description,
                                    thumbnail_url: data.forms[i].thumbnail_url
                                });
                            }

                            return { results: results, more: more };
                        },
                    },
                    formatResult: formFormatResult
                });

                // Event callback for selecting/autocompleting a form
                onSelected = function (event) {
                    $(this).attr('data-form-name', event.object.text);
                    $(this).attr('data-form-id', event.object.id);
                };

                $(this).on('select2-selecting', onSelected);
            });
        }
    });
}(jQuery));

/*jslint sloppy: true, unparam: true, todo: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        drugSearch: function (options) {
            options = options || {};

            if (options === 'destroy') {
                return this.each(function () {
                    $(this).select2('destroy');
                    $(this).off('select2-selecting');
                });
            }

            return this.each(function () {
                var onSelected,
                    defaultUrl;

                defaultUrl = 'https://staging.api.covermymeds.com/drugs?v=' + CMM_API_CONFIG.version;

                // Initialize typeahead.js
                $(this).select2({
                    placeholder: 'Begin typing the medication name and select from list',
                    minimumInputLength: 4,
                    quietMillis: 250,
                    ajax: {
                        url: options.url ? options.url : defaultUrl,
                        transport: function (params) {
                            if (options.url) {
                                return;
                            }
                            params.beforeSend = function (xhr) {
                                xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret));
                            }

                            return $.ajax(params);
                        },
                        data: function (term, page) {
                            return {
                                q: term
                            };
                        },
                        results: function (data, page) {
                            var results = [], more;

                            more = (page * 10) < data.total;
                            for (i = 0, j = data.drugs.length; i < j; i += 1) {
                                results.push({
                                    text: data.drugs[i].full_name,
                                    id: data.drugs[i].id
                                });
                            }
                            return { results: results, more: more };
                        },
                    }
                });

                // Event callback for selecting/autocompleting a drug
                onSelected = function (event) {
                    $(this).attr('data-drug-name', event.object.text);
                    $(this).attr('data-drug-id', event.object.id);
                };

                $(this).on('select2-selecting', onSelected);
            });
        }
    });
}(jQuery));

/*jslint sloppy: true, unparam: true, todo: true */
/*global jQuery: false, CMM_API_CONFIG: false, Base64: false */
(function ($) {
    $.fn.extend({
        createRequest: function (options) {
            options = options || { request: {} };

            if (options === 'destroy') {
                return this.each(function () {
                    $(this).off('click');
                });
            }

            return this.each(function () {
                var defaultUrl,
                    headers;

                defaultUrl = 'https://staging.api.covermymeds.com/requests?v=' + CMM_API_CONFIG.version;
                headers = options.url ? {} : { 'Authorization': 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret) };

                // Attach event handler
                $(this).on('click', function (event) {
                    event.preventDefault();

                    $.ajax({
                        url: options.url || defaultUrl,
                        type: 'POST',
                        headers: headers,
                        success: options.success,
                        error: options.error,
                        data: {
                            request: {
                                form_id: options.form_id || $('input[name="request[form_id]"]').data('form-id'),
                                state: options.state || $('select[name="request[state]"]').val(),
                                patient: {
                                    first_name: options.first_name || $('input[name="request[patient][first_name]"]').val(),
                                    last_name: options.last_name || $('input[name="request[patient][last_name]"]').val(),
                                    date_of_birth: options.date_of_birth || $('input[name="request[patient][date_of_birth]"]').val()
                                },
                                prescription: {
                                    drug_id: options.drug_id || $('input[name="request[prescription][drug_id]"]').data('drug-id')
                                }
                            }
                        },
                        // data: {
                        //     "request": {
                        //         "urgent": "false",
                        //         "form_id": options.form_id || $('input[name="request[form_id]"]').data('form-id'),
                        //         "state": options.state || $('select[name="request[state]"]').val(),
                        //         "patient": {
                        //             "first_name": options.first_name || $('input[name="request[patient][first_name]"]').val(),
                        //             "middle_name": "",
                        //             "last_name": options.last_name || $('input[name="request[patient][last_name]"]').val(),
                        //             "date_of_birth": options.date_of_birth || $('input[name="request[patient][date_of_birth]"]').val(),
                        //             "gender": "",
                        //             "email": "",
                        //             "health_plan_name": "",
                        //             "member_id": "",
                        //             "group_id": "",
                        //             "phone_number": "",
                        //             "address": {
                        //                 "street_1": "",
                        //                 "street_2": "",
                        //                 "city": "",
                        //                 "state": "",
                        //                 "zip": ""
                        //             }
                        //         },
                        //         "prescriber": {
                        //             "npi": "",
                        //             "first_name": "",
                        //             "last_name": "",
                        //             "clinic_name": "",
                        //             "address": {
                        //                 "street_1": "",
                        //                 "street_2": "",
                        //                 "city": "",
                        //                 "state": "",
                        //                 "zip": ""
                        //             },
                        //             "fax_number": "",
                        //             "phone_number": ""
                        //         },
                        //         "prescription": {
                        //             "drug_id": options.drug_id || $('input[name="request[prescription][drug_id]"]').data('drug-id'),
                        //             "strength": "",
                        //             "frequency": "",
                        //             "enumerated_fields": "",
                        //             "refills": "",
                        //             "dispense_as_written": "",
                        //             "quantity": "",
                        //             "days_supply": ""
                        //         },
                        //         "pharmacy": {
                        //             "name": "",
                        //             "address": {
                        //                 "street_1": "",
                        //                 "street_2": "",
                        //                 "city": "",
                        //                 "state": "",
                        //                 "zip": ""
                        //             },
                        //             "fax_number": "",
                        //             "phone_number": ""
                        //         },
                        //         "enumerated_fields": {
                        //             "icd9_0": "",
                        //             "icd9_1": "",
                        //             "icd9_2": "",
                        //             "failed_med_0": "",
                        //             "failed_med_1": "",
                        //             "failed_med_2": "",
                        //             "failed_med_3": "",
                        //             "failed_med_4": "",
                        //             "failed_med_5": "",
                        //             "failed_med_6": "",
                        //             "failed_med_7": "",
                        //             "failed_med_8": "",
                        //             "failed_med_9": ""
                        //         }
                        //     }
                        // }
                    });
                });
            });
        }
    });
}(jQuery));

/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global alert: false, jQuery: false, CMM_API_CONFIG: false, Base64: false, _: false */
(function ($) {
    $.fn.extend({
        dashboard: function (options) {
            options = options || {};

            return this.each(function () {
                var defaultUrl,
                    self;

                self = this;
                defaultUrl = 'https://staging.api.covermymeds.com/requests/search?v=' + CMM_API_CONFIG.version + '&api_id=' + CMM_API_CONFIG.apiId + '&api_secret=' + CMM_API_CONFIG.apiSecret;
                // headers = options.url ? {} : { 'Authorization': 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret) };

                $.ajax({
                    url: options.url || defaultUrl,
                    type: 'POST',
                   // headers: headers,
                    data: {
                        ids: options.ids
                    },
                    success: function (data, status, xhr) {
                        var compiled;

                        compiled = _.template('<% _.each(requests, function (request) { %>' +
                                              '<div class="request row">' +
                                                '<div class="col-lg-2">' +
                                                    '<img src="<%= request.thumbnail_urls %>" />' +
                                                '</div>' +
                                                '<div class="col-lg-4">' +
                                                    '<ul>' +
                                                        '<li><h4><%= request.patient.first_name %> <%= request.patient.last_name %> (Key: <%= request.id %>)</h4></li>' +
                                                        '<li><strong>Status:</strong> <span class="label label-info"><%= request.workflow_status %></span>' +
                                                        '<li>Drug Name Here</li>' +
                                                        '<li><strong>Created:</strong> <%= request.created_at %></li>' +
                                                        '<li><a href="<%= request.tokens[0].html_url %>">View</a></li>' +
                                                   '</ul>' +
                                                '</div>' +
                                              '</div><% }); %>');

                        $(self).append(compiled(data));
                    },
                    error: function (data, status, xhr) {
                        $('.modal-body').text('There was an error processing your request.');
                        $('.modal').modal();
                    }
                });


            });
        }
    });
}(jQuery));


/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}