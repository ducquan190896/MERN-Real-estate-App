const initalState = {
    user: null,
    useSuccess: false,
    userError: false,
    message: null,
    userResetPassword: null
}

export default (state = initalState, action) => {
    switch (action.type) {
        case 'register':
            console.log(action.payload)
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case 'user_reset': 
            return {
                ...state,
                userSuccess: false,
                userError: false
                // userResetPassword: null
            }
        case 'error':
            return {
                ...state,
                userSuccess: false,
                userError: true,
                message: action.payload
            }
        case 'signin': 
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case 'logout': {
            return {
                ...state,
                user: null,
                userSuccess: true,
                message: action.payload
            }
        }
        case 'resetpassword':
             return {
                ...state,
                user: action.payload,
                userSuccess: true,
             }
        default:
            return state
    }
}

