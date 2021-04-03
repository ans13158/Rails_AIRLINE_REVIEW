import 'whatwg-fetch';

// getting csrfToken from header meta tag
const getCsrfToken = () => {
    const $el = document.getElementsByName('csrf-token')[0];
    return $el ? $el.content : null;
};

/**
 * Wrapper for making network requests using es6 native `fetch`
 * @type class
 * @name RestClient
 */
class RestClient {

    static defaultOptions = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            x_csrf_token: getCsrfToken(),
        },
        credentials: 'include', // include cookies with every request
    };

    static encodeForUrl = (obj) => Object
        .keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');

    /**
     * Send HTTP requests and returns the formatted response
     * response object looks like this
     * {
     *    ok: true,
     *    status: 200,
     *    statusText: 'OK',
     *    headers: {},
     *    result: {}
     * }
     * @param {String} url API endpoint
     * @param {Object} options
     * @return {Promise} Returns the response object containing the status and data
     */
    static async request(url, options) {
        const allOptions = { ...this.defaultOptions, ...options };
        allOptions.headers = { ...this.defaultOptions.headers, ...options.headers };
        const response = await fetch(url, allOptions);
        const responseJson = (
            ({
                 ok, status, statusText, headers,
             }) => ({
                ok, status, statusText, headers,
            })
        )(response);
        try {
            responseJson.result = await response.json();
        } catch (ex) {
            responseJson.ok = false;
            responseJson.result = null;
        }
        return responseJson;
    }

    /**
     * Send HTTP GET request
     * @param {String} url  API endpoint
     * @param {Object} payload
     * @return {Promise} Returns either the response in json, or throws an error
     */
    static get(url, payload = null) {
        const options = { method: 'GET' };
        let fullUrl = url;
        if (payload) {
            fullUrl += `?${this.encodeForUrl(payload)}`;
        }
        return this.request(fullUrl, options);
    }

    /**
     * Send HTTP POST request
     * @param {String} url  API endpoint
     * @param payload
     * @param options http request options
     * @return {Promise} Returns either the response in json, or throws an error
     */
    static post(url, payload, options = {}) {
        if (options.formData) {
            const requestOptions = Object.assign(options, { method: 'POST', body: payload });
            return this.requestWithFile(url, requestOptions);
        }
        const requestOptions = Object.assign(options,
            { method: 'POST', body: this.transformPayload(payload, options) });
        return this.request(url, requestOptions);
    }

    /**
     * Send HTTP PATCH request
     * @param {String} url API endpoint
     * @param payload
     * @param options
     * @return {Promise} Returns either the response in json, or throws an error
     */
    static patch(url, payload, options = {}) {
        if (options.formData) {
            const requestOptions = Object.assign(options, { method: 'PATCH', body: payload });
            return this.requestWithFile(url, requestOptions);
        }
        const requestOptions = { method: 'PATCH', body: JSON.stringify(payload) };
        return this.request(url, requestOptions);
    }

    /**
     * Send HTTP DELETE request
     * @param {String} url  API endpoint
     * @param payload
     * @return {Promise} Returns either the response in json, or throws an error
     */
    static delete(url, payload) {
        const options = { method: 'DELETE', body: JSON.stringify(payload) };
        return this.request(url, options);
    }

    /**
     *
     * @param payload
     * @param options
     * @returns {string|*} Return request body in format based on http options
     */
    static transformPayload(payload, options) {
        if (!(options.headers && options.headers['Content-Type'])) {
            return JSON.stringify(payload);
        }
        switch (options.headers['Content-Type']) {
            case HTTP.CONTENT_TYPE.URL_ENCODED: {
                return payload;
            }
            default: {
                return JSON.stringify(payload);
            }
        }
    }
}

export default RestClient;
