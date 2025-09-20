import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useMemo, useState} from "react";
import {WordCollection} from "../../Store/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {AddCollectionForm} from "./AddCollectionForm";
import {useNavigate} from "react-router";
import {wordCollectionsActions} from "../../Store/wordCollectionsSlice";

export function CollectionsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const collections = useSelector((state: any) => state.wordCollections).wordCollections;

    useEffect(() => {
        dispatch(wordCollectionsActions.fetchAllRequest());
    }, [dispatch]);


    const [showAddCollectionForm, setShowAddCollectionForm] = useState(false);

    const handleToggleAddCollectionForm = () => {
        setShowAddCollectionForm(!showAddCollectionForm);
    }


    return (
        <div>

            <div className="p-4 pb-3 flex justify-end">
                <button
                    className={`bg-indigo-500 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-transform shadow-lg z-50 ${showAddCollectionForm ? 'rotate-45' : 'rotate-0'}`}
                    aria-label="Add"
                    onClick={handleToggleAddCollectionForm}
                >
                    <FontAwesomeIcon className='size-6/12' icon={faPlus}></FontAwesomeIcon>
                </button>

            </div>

            {showAddCollectionForm && <AddCollectionForm handleToggleAddCollectionForm={handleToggleAddCollectionForm}/>}

            <div className="flex flex-wrap gap-4 p-4 w-auto" >
                {collections.map((collection: WordCollection) => (
                    <button key={collection.id} className={`p-4 rounded-lg shadow-md w-1/4`}
                         style={{backgroundColor: collection.color}}
                            onClick={() => navigate(`/cards/${collection.id}`)}>
                        <h2 className="text-xl font-bold">{collection.name}</h2>
                        <p className="text-gray-700">{collection.description}</p>
                        <p className="mt-2 text-sm text-gray-600">{collection.wordsList.length} words</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

