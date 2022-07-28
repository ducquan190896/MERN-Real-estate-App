const initialState = {
    houses: [],
    userhouses: [],
    house: null,
    houseSuccess: false, 
    edithouse: null,
    houseError: false,
    edit: false,
    housemessage: null,
    housetype: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'get_houses': 
            return {
                ...state,
                houseSuccess: true,
                houses: action.payload
            }
        case 'get_house_user':
            return {
                ...state,
                houseSuccess: true,
                userhouses: action.payload
            }
        case 'house_reset':
            return {
                ...state,
                houseSuccess: false,
                houseError: false,
                edit: false,
                edithouse: false
            }
        case 'house_create': {
            return {
                ...state,
                houses: [...state.houses, action.payload],
                userhouses: [...state.userhouses, action.payload],
                houseSuccess: true
            }
        }
        case 'house_delete': {
            return {
                ...state,
                houses: state.houses.filter(houseitem => houseitem._id.toString() !== action.payload.toString()),
                houses: state.userhouses.filter(houseitem => houseitem._id.toString() !== action.payload.toString())
            }
        }
        case 'choose_house_edit': 
            return {
                ...state,
                edit: true,
                edithouse: action.payload
            }
        case 'house_update': {
            return {
                ...state,
                edit: true,
                edithouse: action.payload,
                houses: state.houses.map(houseitem => houseitem._id.toString() == action.payload._id.toString()  ? action.payload : houseitem),
                houses: state.userhouses.map(houseitem => houseitem._id.toString() == action.payload._id.toString()  ? action.payload : houseitem)  

            }
        }
        case 'get_single_house':
            return {
                ...state,
                houseSuccess: true,
                house: action.payload
            }
        case 'house_type':
            return {
                ...state,
                housetype: action.payload
            }
        case 'house_error':
            return {
                ...state,
                houseError: true,
                houseSuccess: false,
                housemessage: action.payload
            }
        case 'reset_edit': 
            return {
                ...state,
                edit: false,
                edithouse: null
            }
        default:
            return state
    }
}