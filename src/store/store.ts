import {createStore} from "redux";
import {Word} from "./Types";
import {ADD_WORD, REMOVE_WORD, TOGGLE_LAYOUT, UPDATE_WORD} from "./actions";

let defaultState: { words: Word[],  isLayoutOpen: boolean} = {
    isLayoutOpen: true,
    words: [
    ],

}

const wordsReducer = (state = defaultState, action: { type: string; payload?: any }) => {
    if(action.type === ADD_WORD) {
        const newWord: Word = action.payload
        newWord.id = state.words.length + 1;

        return {
            ...state,
            words: [newWord, ...state.words]
        };
    }
    if(action.type === REMOVE_WORD) {
        const wordId = action.payload;
        return {
            ...state,
            words: state.words.filter(word => word.id !== wordId)
        };
    }
    if(action.type === UPDATE_WORD) {
        const wordId = action.payload.id;

        return {
            ...state,
            words: state.words.map(word =>
                word.id === wordId ? action.payload : word
            )
        };
    }
    if(action.type === TOGGLE_LAYOUT) {
        return {
            ...state,
            isLayoutOpen: !state.isLayoutOpen
        };
    }

    return state;
}

export default createStore(wordsReducer);