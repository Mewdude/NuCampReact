import * as ActionTypes from './ActionTypes';

export const addComment=(campsiteID, rating, author, text)=>({
    type: ActionTypes.ADD_COMMENT,
    payload:{
        campsiteID: campsiteID,
        rating: rating,
        author: author,
        text: text
    }
})