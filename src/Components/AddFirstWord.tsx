import {useDispatch} from "react-redux";
import {Word} from "../store/Types";
import {addWord} from "../store/actions";
import React from "react";

export function AddFirstWord() {
    const dispatch = useDispatch();

    const handleAddWord = () => {
        const newWord: Word = {
            word: 'New Word',
            definition: 'Definition of new word',
        };
        dispatch(addWord(newWord));
    }

    return (
        <div
            className="flex flex-1 flex-col items-center justify-center min-h-screen  order-1 md:order-2">
            <button className="bg-indigo-300 text-white px-3 py-1 rounded-md hover:bg-indigo-400 size-3/12"
                    onClick={() => handleAddWord()}>
                <div className="flex justify-center text-3xl">
                    Add First Word
                </div>
            </button>
        </div>
    );
}