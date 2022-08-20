import axios from 'axios';

import {
    GET_INITIALS_REQUEST, GET_INITIALS_SUCCESS, GET_INITIALS_FAIL,
    INITIAL_ADD_REQUEST, INITIAL_ADD_SUCCESS, INITIAL_ADD_FAIL,
    INITIAL_DELETE_REQUEST,INITIAL_DELETE_SUCCESS,INITIAL_DELETE_FAIL
} from '../constants/omurConstants'

export const getInitials = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_INITIALS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            "https://omurziyad.herokuapp.com/api/omur/initials/",
            config,
        )

        dispatch({
            type: GET_INITIALS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_INITIALS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const addInitial = (content) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INITIAL_ADD_REQUEST
        })

        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            "https://omurziyad.herokuapp.com/api/omur/createinitial/",
            {
                'content': content,
            },
            config,
        )

        dispatch({
            type: INITIAL_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: INITIAL_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const deleteInitial = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INITIAL_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `https://omurziyad.herokuapp.com/api/omur/initial/delete/${id}`,
            config,
        )
        dispatch({
            type: INITIAL_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: INITIAL_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}