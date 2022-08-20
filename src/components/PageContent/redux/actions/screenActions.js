import {
    GET_SCREEN_WIDTH
} from "../constants/screenConstants";


export const get_screen_width = () => async (dispatch) => {
    dispatch({type: GET_SCREEN_WIDTH})
}
