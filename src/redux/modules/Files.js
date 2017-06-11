export const constraints = {
    UPDATE_LOADING: 'UPDATE_LOADING'
};

export const actions = {
    updateLoading(payload) {
        return { payload, type: 'UPDATE_LOADING' };
    }
};

export const defaultState = {
    loading: false
};

/**
 * [reducer description]
 * @param  {[type]} state  [description]
 * @param  {Object} action [description]
 * @return {[type]}        [description]
 */
export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
    case constraints.UPDATE_LOADING:
        return {
            ...state,
            loading: action.payload
        };
    default:
        return state;
    }
}
