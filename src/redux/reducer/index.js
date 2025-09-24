import { SET_TASKS, SET_USER, SET_TILTE, SET_NOTE, SET_POST } from "../types"

export const rootState = {
    user: null,
    theme: "light",
    tasks: [],
    title: [],
    notes: [],
    posts: []


}

export const dataReducer = (initialState = rootState, action) => {
    let type = action.type;
    switch (type) {
        case SET_USER: return { ...initialState, user: action.payload }
        case SET_TASKS: return { ...initialState, tasks: action.payload }
        case SET_TILTE: return { ...initialState, title: action.payload }
        case SET_NOTE: return { ...initialState, notes: action.payload }
        case SET_POST: return {...initialState,posts: action.payload}


//create new state-handlers here

        default: return { ...initialState }


    }

}