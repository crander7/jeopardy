const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
    loaded: false
};

/**
 * info reducer
 * @param  {object} state  current state
 * @param  {Object} action action object
 * @return {object}        new state
 */
export default function info(state = initialState, action = {}) {
    switch (action.type) {
    case LOAD:
        return {
            ...state,
            loading: true
        };
    case LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result
        };
    case LOAD_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false,
            error: action.error
        };
    default:
        return state;
    }
}

/**
 * checks if global state is loaded
 * @param  {object}  globalState global state
 * @return {Boolean}             true if global state is loaded
 */
export function isLoaded(globalState) {
    return globalState.info && globalState.info.loaded;
}

/**
 * load something
 * @return {object} some object with a promise
 */
export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.get('/loadInfo')
    };
}
