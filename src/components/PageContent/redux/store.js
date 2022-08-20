import {
    createStore, combineReducers, applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

import {
    composeWithDevTools
} from '@redux-devtools/extension'

import {
    userLoginReducer,
} from './reducers/userReducers'

import {
    getScreenWidthReducer
} from './reducers/screenReducers'

import {
    addOmurInitialReducer, getOmurInitialsReducer, initialDeleteReducer
} from './reducers/omurReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    getScreenWidth: getScreenWidthReducer,
    omurInitials: getOmurInitialsReducer,
    initialCreate: addOmurInitialReducer,
    initialDelete: initialDeleteReducer
})

const userInfoFromLS = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromLS,
    },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store