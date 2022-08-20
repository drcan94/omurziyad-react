import {USER_LOGOUT} from "../constants/userConstants";
import {
    GET_INITIALS_REQUEST, GET_INITIALS_SUCCESS, GET_INITIALS_FAIL,
    INITIAL_ADD_REQUEST, INITIAL_ADD_SUCCESS, INITIAL_ADD_FAIL, INITIAL_ADD_RESET,
    INITIAL_DELETE_REQUEST, INITIAL_DELETE_SUCCESS, INITIAL_DELETE_FAIL,INITIAL_DELETE_RESET

} from '../constants/omurConstants'

const initialInitialsState = {
    loading: null,
    success: null,
    initialsData: null,
    error: null
}

export const getOmurInitialsReducer = (state = initialInitialsState, action) => {
    switch (action.type) {
        case GET_INITIALS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
            }

        case GET_INITIALS_SUCCESS:
            return {
                loading: false,
                error: false,
                success: true,
                initialsData: action.payload
            }

        case GET_INITIALS_FAIL:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const addOmurInitialReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIAL_ADD_REQUEST:
            return {
                loading: true
            }

        case INITIAL_ADD_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case INITIAL_ADD_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case INITIAL_ADD_RESET:
            return {}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const initialDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIAL_DELETE_REQUEST:
            return {
                loading: true,
            };

        case INITIAL_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };

        case INITIAL_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
            case INITIAL_DELETE_RESET:
            return {};

        default:
            return state;
    }
};
