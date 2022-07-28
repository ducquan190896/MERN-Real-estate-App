

export const register = (formdata) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json()
        dispatch({
            type: 'register',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'error',
            payload: err.message
        })
    }
}

export const userError = () => (dispatch) => {
    dispatch({
        type: 'error',
        payload: 'not authorized'
    })
}
export const userReset = () => (dispatch) => {
    dispatch({
        type: 'user_reset'
    })
}

export const signin = (formdata) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json()
        dispatch({
            type: 'signin',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'error',
            payload: err.message
        })
    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type: 'logout',
        payload: 'you signed out successfully'
    })
}

export const forgetpassword = (email) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/user/forgetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        const data = await res.json()
       console.log(data)
    } catch (err) {
        dispatch({
            type: 'error',
            payload: err.message
        })
    }
}
export const resetpassword = (tokenid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/user/forgetpassword/${tokenid}`)
        const data = await res.json()
       console.log(data)
       dispatch({
        type: 'resetpassword',
        payload: data
       })
    } catch (err) {
        dispatch({
            type: 'error',
            payload: err.message
        })
    }
}


export const updatepassword = (newpassword, userid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/user/updatepassword/${userid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newpassword)
        })
        const data = await res.json()
        dispatch({
            type: 'updatepassword',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'error',
            payload: err.message
        })
    }
}
 