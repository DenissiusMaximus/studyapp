import {useDispatch, useSelector} from "react-redux";
import {CardsMenu} from "./CardsMenu";
import {ShowCards} from "./ShowCards";
import {AddFirstWord} from "./AddFirstWord";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {wordCollectionsActions} from "../../Store/wordCollectionsSlice";

export function CardPage() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const currentCollection = useSelector((state: any) => state.wordCollections).selectedWordCollection;

    useEffect(() => {
        if(!id) {
            console.error("No collection ID provided in URL");
            return;
        }
        dispatch(wordCollectionsActions.fetchByIdRequest(id));
    }, [dispatch]);


    if (!currentCollection) {
        return <div className="flex items-center justify-center text-4xl font-bold">Collection not found</div>;
    }
    const wordsList = currentCollection.wordsList;

    return (
        <div className="bg-gray-100 flex flex-col md:flex-row">
            <CardsMenu wordsList={wordsList}/>
            {wordsList.length > 0 && <ShowCards wordsList={wordsList}/>}
            {wordsList.length === 0 && <AddFirstWord/>}
        </div>
    );
}