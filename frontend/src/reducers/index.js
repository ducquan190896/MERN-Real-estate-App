import {combineReducers} from 'redux'
import houseReducer from './houseReducer'
import userReducer from './userReducer'

export default combineReducers({
    auth: userReducer,
    House: houseReducer
})

