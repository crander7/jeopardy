/* global USER_LOGGED_IN, USER_LOGGED_OUT, payload */
// Constants
export const constants = {
    USER_LOGGED_IN: 'USER_LOGGED_IN',
    USER_LOGGED_OUT: 'USER_LOGGED_OUT',
    USER_LOGGING_IN: 'USER_LOGGING_IN',
    USER_CHECK: 'USER_CHECK',
    LOCATION_CHANGE: '@@router/LOCATION_CHANGE',
    END_GLOBAL_LOAD: '@reduxAsyncConnect/END_GLOBAL_LOAD'
};


/**
 * [default state description]
 * @property {Boolean} isLoading is true if we're asynchronously loading permissions
 * @property {String} coded is the encoded json web token from accts
 * @property {Object} decoded is the decoded json web token from accts
 * @property {Array} permissions is the array of permissions (strings) that the user has
 * @property {Boolean} stale indicates if permissions should be re-fetched at the next opportunity.
 */
export const defaultState = {
    isLoading: false,
    coded: null,
    decoded: null,
    permissions: null,
    stale: false
};

let initialLoad = true;

/**
 * [default function description]
 * @param {Object} state the state to be reduced
 * @param {String} type the action type
 * @param {Object} payload the data that comes with the action
 * @returns {Object} state
 */
export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
    case constants.LOCATION_CHANGE:
        // On location change we null the permissions in order to re-fetch them form accts
        // this allows us to be constantly present of changes to the users permissions
        if (initialLoad) {
            initialLoad = false;
            return state;
        }
        return { ...state, stale: true };
    case constants.USER_LOGGING_IN:
        // This action tells the redux-auth-wrapper that
        // we're currently waiting for an async callback
        return { ...state, isLoading: true, stale: false };
    case constants.USER_CHECK:
        return {
            ...state,
            ...payload,
            isLoading: false,
            stale: false
        };
    case constants.USER_LOGGED_IN:
        // This action tells the redux-auth-wrapper that we're
        // done loading and have the permissions form accts
        return {
            ...state,
            ...payload,
            isLoading: false,
            stale: false
        };
    case constants.USER_LOGGED_OUT:
        // This action logs the user out by resetting permissions and
        // clearing out the cookie enformation
        return { ...state, ...defaultState };
    case constants.END_GLOBAL_LOAD:
        // if the global load finishes, we need to set isLoading to false
        return { ...state, isLoading: false };
    default:
        return state;
    }
}

