import { createStore, combineReducers } from 'redux';
// import Axios from 'axios';
// import thunk from 'redux-thunk';
// const Look = function (state = [], action) {
//     switch (action.type) {
//         case "Look":
//             let newState = JSON.parse(JSON.stringify(state));
//             newState.push(action.data);
//             return [...newState]

//         default:
//             return [...state];
//     }
// }
// let defaultState
// Axios.get('/api/mock').then(res => {
//     defaultState = res.data;
// })
// const addStudent = function (state = [], action) {
//     switch (action.type) {
//         case "ADD_sTUDENT":
//             let newState = JSON.parse(JSON.stringify(state));
//             newState.push(action.data);
//             return [...newState]

//         default:
//             return [...state]
//     }
// }
const menu = function (state = [], action) {
    switch (action.type) {
        case "LIST_GET":
            var newState = JSON.parse(JSON.stringify(state));
            
            return newState;
        default:
            return state;
    }
}
const listData = function (state = [], action) {
    switch (action.type) {
        case "SEARCH_LIST":
            state=action.data;
            return state;
        default:
            return state;
    }
}
let reducer = combineReducers({ menu ,listData});
let store = createStore(reducer);
export default store;