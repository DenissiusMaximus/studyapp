import {useSelector} from "react-redux";
import {Word} from "../store/Types";
import {CardsMenu} from "./CardsMenu";
import {ShowCards} from "./ShowCards";
import {AddFirstWord} from "./AddFirstWord";
import React from "react";

export function CardsPage() {
    const words = useSelector((state: { words: Word[] }) => state.words);

    return (
        <div className="bg-gray-100 flex flex-col md:flex-row">
            <CardsMenu/>
            {words.length > 0 && <ShowCards/>}
            {words.length === 0 && <AddFirstWord/>}
        </div>
    );
}