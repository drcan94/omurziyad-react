import {
    GET_SCREEN_WIDTH,
  } from "../constants/screenConstants";


export const getScreenWidthReducer= (state = {dynamicWidth: window.innerWidth}, action) => {
    switch (action.type) {

        case GET_SCREEN_WIDTH:
            return {
                dynamicWidth:  window.innerWidth
            }

        default:
            return state
    }
}
