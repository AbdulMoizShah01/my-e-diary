import { SET_TASKS, SET_TILTE, SET_USER, SET_NOTE, SET_POST } from "../types"

export const setUser=(payload)=>{
    return {type:SET_USER,payload}
}
export const setTasks=(payload)=>{
    return {type:SET_TASKS,payload}
}

export const setTitle=(payload)=>{
    return {type:SET_TILTE,payload}
}

export const setNotes=(payload)=>{
    return {type:SET_NOTE,payload}
}

export const setPosts=(payload)=>{
    return{type: SET_POST, payload}
}