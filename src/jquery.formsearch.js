/*jslint sloppy: true, unparam: true, todo: true, nomen: true */
/*global jQuery: false, CMM_API_CONFIG: false, Base64: false, _: false */
(function ($) {
    $.fn.extend({
        formSearch: function (options) {
            options = options || {};

            // Remove plugins/event handlers
            if (options === 'destroy') {
                return this.each(function () {
                    $(this).select2('destroy');
                    $(this).off('select2-selecting');
                });
            }

            return this.each(function () {
                var onSelected,
                    defaultUrl;

                defaultUrl = 'https://' + (options.staging ? 'staging.' : '') + 'api.covermymeds.com/forms?v=' + CMM_API_CONFIG.version;

                // Initialize select2
                $(this).select2({
                    placeholder: 'Plan, PBM, Form name, BIN, or Contract ID',
                    minimumInputLength: 4,
                    ajax: {
                        quietMillis: 250,
                        url: options.url || defaultUrl,
                        transport: function (params) {
                            // Add authorization header if directly querying API;
                            // otherwise we assume our custom URL will handle authorization
                            if (!options.url) {
                                params.beforeSend = function (xhr) {
                                    xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(CMM_API_CONFIG.apiId + ':' + CMM_API_CONFIG.apiSecret));
                                };
                            }

                            return $.ajax(params);
                        },
                        data: function (term, page) {
                            var state,
                                drugId;

                            // Values are either passed in to plugin constructor, or
                            // taken from input fields that conform to naming convention
                            state = options.state || $('select[name="request[state]"]').val();
                            drugId = options.drugId || $('input[name="request[drug_id]"]').data('drug-id');

                            return {
                                q: term,
                                state: state,
                                drug_id: drugId
                            };
                        },
                        results: function (data, page) {
                            var results = [],
                                more,
                                i,
                                j;

                            more = (page * 10) < data.total;
                            for (i = 0, j = data.forms.length; i < j; i += 1) {
                                results.push({
                                    id: data.forms[i].request_form_id,
                                    text: data.forms[i].description,
                                    thumbnail_url: data.forms[i].thumbnail_url
                                });
                            }

                            return {
                                results: results,
                                more: more
                            };
                        }
                    },
                    formatResult: function (form) {
                        var markup;

                        markup = "<table class='table'>";
                        markup += "<tr>";
                        markup += "<td><img src='" + form.thumbnail_url + "' /></td>";
                        markup += "<td>" + form.text + "</td>";
                        markup += "</tr>";
                        markup += "</table>";

                        return markup;
                    }
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
