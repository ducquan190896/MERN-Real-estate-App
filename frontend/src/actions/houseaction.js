export const gethouses = () => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/house')
        const data = await res.json()
       
        dispatch({
            type: 'get_houses',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'house_error',
            payload: err.message
        })
    }
}
export const createhouse= (token, formdata) => async (dispatch) => {
    try {
        const form = new FormData()
        const {type, offer, location, city, parking, regularprice, discountedprice, country, propertyname, furnished, bathroom, bedroom} = formdata
        // const formdata1 = {
        //     type, offer, location, city, parking, regularprice, discountedprice, country, propertyname, furnished, bathroom, bedroom
        // }
        // for (let x of formdata1) {
        //     form.append(`${x}`, formdata1[x])
        //     console.log(`${x}`, formdata1[x])
        // }
        // formdata.imagefiles.forEach(image => {
        //     form.append('imagefile', image)
        //     console.log(image)
        // })
        
        
        // imagefiles.forEach(image => form.append('imagefile', image))
        // form.append('imagefile', formdata.imagefiles[0])
        // form.append('imagefile', formdata.imagefiles[1])
        // form.append('imagefile', formdata.imagefiles[2])
        for (let i = 0; i < formdata.imagefiles.length; i++) {
            form.append('imagefile', formdata.imagefiles[i])
        }
        form.append('type', type)
        form.append('offer', offer)
        form.append('location', location)
        form.append('city', city)
        form.append('parking', parking)
        form.append('regularprice', regularprice)
        form.append('discountedprice', discountedprice)
        form.append('country', country)
        form.append('propertyname', propertyname)
        form.append('furnished', furnished)
        form.append('bathroom', bathroom)
        form.append('bedroom', bedroom)
        

        

        
        // if we use new FormData(), we don't need to specify 'Accept' and 'multipart/form-data' in headers of fetch api
        
        const res = await fetch('http://localhost:5000/api/house', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                
            },
            body: form
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'house_create',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'house_error',
            payload: err.message
        })
    }
}

export const getsinglehouse = (houseid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/house/${houseid}`)
        const data = await res.json()
        dispatch({
            type: 'get_single_house',
            payload: data
        })


    } catch (err) {
        dispatch({
            type: 'house_error',
            payload: err.message
        })
    }
}

export const gethouseUser = (token) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/house/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
       
        dispatch({
            type: 'get_house_user',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'house_error',
            payload: err.message
        })
    }
}
export const deletehouse = (token, houseid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/house/${houseid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
       
        dispatch({
            type: 'house_delete',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'house_error',
            payload: err.message
        })
    }
}
export const updatehouse = (token, houseid, formdata) => async (dispatch) => {
    try {
        const form = new FormData()
        const {type, offer, location, city, parking, regularprice, discountedprice, country, propertyname, furnished, bathroom, bedroom} = formdata
        
        // form.append('imagefile', formdata.imagefiles[0])
        // form.append('imagefile', formdata.imagefiles[1])
        // form.append('imagefile', formdata.imagefiles[2])
        // formdata.imagefiles.forEach(image => form.append('imagefile', image))
        for (let i = 0; i < formdata.imagefiles.length; i++) {
            form.append('imagefile', formdata.imagefiles[i])
        }
        form.append('type', type)
        form.append('offer', offer)
        form.append('location', location)
        form.append('city', city)
        form.append('parking', parking)
        form.append('regularprice', regularprice)
        form.append('discountedprice', discountedprice)
        form.append('country', country)
        form.append('propertyname', propertyname)
        form.append('furnished', furnished)
        form.append('bathroom', bathroom)
        form.append('bedroom', bedroom)
        console.log(formdata)

        const res = await fetch(`http://localhost:5000/api/house/${houseid}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        })
        const data = await res.json()
       console.log(data)
        dispatch({
            type: 'house_update',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'house_error',
            payload: err.message
        })
    }
}
export const choosehouseUpdate = (houseitem) => (dispatch) => {
    dispatch({
        type: 'choose_house_edit',
        payload: houseitem
    })
}

export const resetEdit = () => (dispatch) => {
    dispatch({
        type: 'reset_edit'
    })
}