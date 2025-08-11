import {Word} from "../store/Types";
import {useDispatch, useSelector} from "react-redux";
import {addWord} from "../store/actions";
import React from "react";
import {WordMiniCard} from "./WordMiniCard";

export function CardsMenu() {
    const dispatch = useDispatch();
    const words = useSelector((state: any) => state.words);

    const handleAddWord = () => {
        const newWord: Word = {
            word: 'New Word',
            definition: 'Definition of new word',
        };
        dispatch(addWord(newWord));
    }

    return (
        <>
            <div className="h-1/3 md:h-screen w-full md:w-1/5 bg-indigo-300/80 order-2 md:order-1 flex flex-col">
                <div className="p-5 pb-3 flex justify-end">
                    <button
                        className="bg-indigo-400 text-white px-3 py-1 rounded-md hover:bg-indigo-500 transition-colors"
                        onClick={handleAddWord}
                    >
                        Add
                    </button>
                </div>

                <div
                    className="flex-1 overflow-y-auto px-3 pb-4 space-y-2"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {words.map((word: Word) => (
                        <WordMiniCard key={word.id} cardWord={word} />
                    ))}
                </div>
            </div>
        </>
    )
}