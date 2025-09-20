import {WordCollection} from "../../Store/types";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {wordCollectionsActions} from "../../Store/wordCollectionsSlice";

export function AddCollectionForm( {handleToggleAddCollectionForm}: {
    handleToggleAddCollectionForm: any
}) {
    const colorsList = [
        '#a5b4fc', // indigo-300
        '#93c5fd', // blue-300
        '#6ee7b7', // green-300
        '#fde68a', // yellow-300
        '#fca5a5', // red-300
        '#d8b4fe', // purple-300
        '#f9a8d4', // pink-300
        '#5eead4', // teal-300
        '#fdba74', // orange-300
        '#67e8f9', // cyan-300
    ];

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState<string>(colorsList[0]);

    const descriptionTextAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const autoResizeDescription = () => {
        if (descriptionTextAreaRef.current) {
            descriptionTextAreaRef.current.style.height = 'auto';
            descriptionTextAreaRef.current.style.height = descriptionTextAreaRef.current.scrollHeight + 'px';
        }
    }

    useEffect(() => {
        autoResizeDescription();
    }, [description])

    const handleAddCollection = () => {
        if (!name.trim()) {
            alert('Please enter a name for the collection.');
            return;
        }

        const newCollection: WordCollection = {
            id: 0, // id will be set by the backend
            name: name.trim(),
            description: description.trim(),
            color: color,
            wordsList: []
        }

        dispatch(wordCollectionsActions.createCollection(newCollection))

        handleToggleAddCollectionForm();
    }

    return (
        <div className={`add-collection-form-animation show fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-10`}>
            <div
                className="border-4 border-indigo-400 bg-white rounded-lg p-6 w-2/3 h-2/3 shadow-lg flex md:flex-row">
                <div className='flex flex-col pr-5 w-full h-full overflow-y-auto' onSubmit={handleAddCollection}>
                    <input className='border-4 h-12 border-indigo-400  rounded-lg p-2 w-2/3 mb-4 text-xl outline-none'
                           placeholder='Name'
                           onChange={e => setName(e.target.value)}
                    />
                    <textarea
                        ref={descriptionTextAreaRef}
                        value={description}
                        className="border-4 h-12 border-indigo-400 rounded-lg p-2 w-full mb-4 outline-none resize-none whitespace-pre-wrap break-words text-xl"
                        placeholder='Description'
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        style={{minHeight: '1.5rem'}}
                    />
                    <div className="flex flex-row flex-wrap gap-4">
                        {colorsList.map((c: string, index: number) => (
                            <ColorSquare
                                key={index}
                                bgColor={c}
                                isSelected={c === color}
                                onSelect={() => setColor(c)}
                            />
                        ))}

                    </div>

                    <div className={'flex flex-row items-end justify-center mt-auto gap-10'}>
                        <button
                            className={'rounded-lg border-2 border-red-400 py-1 px-8 text-red-500 text-xl font-semibold hover:bg-red-500 hover:text-white'}
                            onClick={handleToggleAddCollectionForm}>
                            Cancel
                        </button>
                        <button
                            className={'rounded-lg border-2 border-green-400 py-1 px-8 text-white bg-green-400 text-xl font-semibold hover:hover:bg-white hover:text-green-400'}
                            onClick={handleAddCollection}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

function ColorSquare({bgColor, isSelected, onSelect,}: any) {

    return (
        <button onClick={onSelect} type="button"
                className={`w-12 h-12 rounded-lg ${isSelected ? 'border-4 border-white' : ''}`}
                style={{backgroundColor: bgColor}}
        ></button>
    );
}