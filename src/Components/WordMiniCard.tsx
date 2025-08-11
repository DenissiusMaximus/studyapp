import React from "react";
import {useDispatch} from "react-redux";
import {Word} from "../store/Types";
import {removeWord, updateWord} from "../store/actions";

export type WordMiniCardProps = {
    cardWord: Word;
}

export function WordMiniCard({cardWord}: WordMiniCardProps) {
    const [word, setWord] = React.useState(cardWord.word);
    const [definition, setDefinition] = React.useState(cardWord.definition);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleBeforeUnload = () => {
            handleApply();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleApply = () => {
        if (word !== cardWord.word || definition !== cardWord.definition) {
            if (word.trim() === '') {
                //TODO little error message in the bottom
                return;
            }
            const updatedWord: Word = {
                ...cardWord,
                word: word,
                definition: definition
            };

            dispatch(updateWord(updatedWord));
        }
    }

    const handleRemove = () => {
        if (cardWord.id != null) {
            dispatch(removeWord(cardWord.id));
        }
    }

    const wordRef = React.useRef<HTMLTextAreaElement>(null);
    const definitionRef = React.useRef<HTMLTextAreaElement>(null);

    const autoResizeWord = () => {
        if (wordRef.current) {
            wordRef.current.style.height = 'auto';
            wordRef.current.style.height = wordRef.current.scrollHeight + 'px';
        }
    };

    const autoResizeDefinition = () => {

        if (definitionRef.current) {
            definitionRef.current.style.height = 'auto';
            definitionRef.current.style.height = definitionRef.current.scrollHeight + 'px';
        }
    };

    React.useEffect(() => {
        autoResizeWord();
    }, [word]);

    React.useEffect(() => {
        autoResizeDefinition();
    }, [definition]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <div className="flex flex-row">
                  <textarea
                      ref={wordRef}
                      value={word}
                      className="text-lg font-semibold w-full outline-none resize-none whitespace-pre-wrap break-words"
                      onChange={(e) => {
                          setWord(e.target.value);
                      }}
                      onFocus={(e) => e.target.select()}
                      onBlur={() => handleApply()}
                      style={{minHeight: '1.5rem'}}
                  />

                <button
                    className="bg-red-400 text-white ml-1 rounded-md hover:bg-red-500 size-1/12"
                    onClick={() => handleRemove()}
                >
                    X
                </button>
            </div>
            <div className="flex flex-row">
                <textarea
                    ref={definitionRef}
                    value={definition}
                    className="text-lg text-gray-600 w-full outline-none resize-none whitespace-pre-wrap break-words"
                    onChange={(e) => {
                        setDefinition(e.target.value);
                    }}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => handleApply()}
                    style={{minHeight: '1.5rem'}}
                />
            </div>
        </div>
    );
}