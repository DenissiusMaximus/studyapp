import {Word} from "../../Store/types";
import React, {useEffect} from "react";
import {WordMiniCard} from "./WordMiniCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";

export function CardsMenu({wordsList: originalWordsList}: any) {
    const handleAddWord = () => {
        const newWord: Word = {
            name: 'New Word',
            definition: 'Definition of new word',
        };

        setDraftCollections([...draftCollections, newWord]);
        console.log(draftCollections);
    }

    const [draftCollections, setDraftCollections] = React.useState<any>([]);

    useEffect(() => {
        setDraftCollections([...originalWordsList]);
    }, [originalWordsList]);

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
                    {draftCollections.map((word: Word) => (
                        <WordMiniCard key={word.id} cardWord={word} />
                    ))}
                </div>
            </div>
        </>
    )
}
