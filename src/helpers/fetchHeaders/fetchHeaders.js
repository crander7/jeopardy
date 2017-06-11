/**
 * fetchHeaders
 * @description - standardized way to set the headers for API requests.
 * @param {Object} user - user object, should contain a `coded` property for authed requests
 * @return {Object} headers - Object containing formatted headers
 */
export default function fetchHeaders(user = {}) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (user && user.coded) {
        headers.Authorization = `Bearer: ${user.coded}`;
    }
    return headers;
}
