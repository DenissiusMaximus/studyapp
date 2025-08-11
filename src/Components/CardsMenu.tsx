import {Word} from "../store/Types";
import {useDispatch, useSelector} from "react-redux";
import {addWord} from "../store/actions";
import React from "react";
import {WordMiniCard} from "./WordMiniCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

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
                <div className="p-4 pb-3 flex justify-end">
                    <button
                        className="bg-indigo-500 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-lg"
                        onClick={handleAddWord}
                        aria-label="Add"
                    >
                        <FontAwesomeIcon className='size-6/12' icon={faPlus}></FontAwesomeIcon>
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