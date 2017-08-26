// middleware： 简化fetch处理， 并且加上token
function callApi(endpoint, init, token) {
    let headers = {
        "Content-Type": "application/json",
    };

    if(token) {
        headers = {
            ...headers,
            'Authorization': `Bearer ${token}`,
        };
    }
    init.headers = new Headers(headers);
    return fetch(endpoint, init)
        .then(response => response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            } else if (!json.success) {
                throw new Error(json.msg);
            }

            return json;
        }));
}

export const CALL_API = 'Call_API'

export default store => next => action => {
    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint, init = {}, types } = callAPI;

    const [ requestType, successType, errorType ] = types;
    next({ type: requestType });

    let token = null;
    const auth = store.getState().auth;
    if (auth.user.token) {
        token = auth.user.token;
    }
    return callApi(endpoint, init, token).then(
        response => {
            return next({
                response,
                type: successType,
            })
        },
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    );
}
