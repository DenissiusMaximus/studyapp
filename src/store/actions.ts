import {Word} from "./Types";

export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD = 'REMOVE_WORD';
export const UPDATE_WORD = 'UPDATE_WORD';
export const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';

export const toggleLayout = () => ({
    type: TOGGLE_LAYOUT,
})

export const addWord = (word: Word) => ({
    type: ADD_WORD,
    payload: word,
});

export const removeWord = (wordId: number) => ({
    type: REMOVE_WORD,
    payload: wordId,
});

export const updateWord = (word: Word) => ({
    type: UPDATE_WORD,
    payload: word,
});

