import { AuthStatus } from './auth_actions'

const initialState = {
    token: null,
    userId: null,
    username: null,
    error: null,
    loading: false,
    
}

const authStart = (state, action) => {
    return { ...state, error: null, loading: true }
}

const authSuccess = (state, { username, token, userId}) => {
    return { 
        ...state, error: null,loading: false,
        username, token, userId        
    }
}

const authFail = (state, { error }) => {
    return { ...state, error, loading: false}
}

const authLogout = (state, action) => {
    return { ...state, token: null, userId: null, username: null, socket: null }
}

const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case AuthStatus.AUTH_START: return authStart(state, action)
        case AuthStatus.AUTH_SUCCESS: return authSuccess(state, action)
        case AuthStatus.AUTH_FAIL: return authFail(state, action)
        case AuthStatus.AUTH_LOGOUT: return authLogout(state, action)
        
        default:
            return state
    }
}

export default authReducer