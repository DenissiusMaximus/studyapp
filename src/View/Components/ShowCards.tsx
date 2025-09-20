import {useSelector} from "react-redux";
import {Word} from "../../Store/types";
import React from "react";
import {FlipCard} from "./FlipCard";

const ANIMATION_CLASSES = {
    idle: "opacity-100 translate-x-0 translate-y-0 transition-all duration-300",

    leavingRight: "opacity-0 -translate-x-80 -translate-y-20 transition-all duration-300",
    enteringRight: "opacity-0 translate-x-80 -translate-y-20 transition-none",

    leavingLeft: "opacity-0 translate-x-80 -translate-y-20 transition-all duration-300",
    enteringLeft: "opacity-0 -translate-x-80 -translate-y-20 transition-none",
};

export function ShowCards({wordsList} :any) {
    const [currentCard, setCurrentCard] = React.useState<Word | undefined>(wordsList[0]);

    const [animation, setAnimation] = React.useState<'idle' | 'leavingLeft' | 'enteringLeft' | 'leavingRight' | 'enteringRight'>('idle');

    let frontText = currentCard?.name ?? "";
    let backText = currentCard?.definition ?? "";

    React.useEffect(
        () => {
            if (wordsList.length > 0) {
                setCurrentCard(wordsList[wordsList.length - 1]);
            }
        },
        [wordsList]
    )

    const handleNextCard = () => {
        if (wordsList.length <= 1)
            return;

        setAnimation('leavingLeft');
        setTimeout(() => {

            const currentIndex = wordsList.indexOf(currentCard!);
            const nextIndex = (currentIndex + 1) % wordsList.length;
            setCurrentCard(wordsList[nextIndex]);

            setAnimation('enteringLeft');
            setTimeout(() => setAnimation('idle'), 15);
        }, 100);
    }

    const handlePreviousCard = () => {
        if (wordsList.length <= 1)
            return;

        setAnimation('leavingRight');
        setTimeout(() => {

            const currentIndex = wordsList.indexOf(currentCard!);
            const previousIndex = (currentIndex - 1 + wordsList.length) % wordsList.length;
            setCurrentCard(wordsList[previousIndex]);

            setAnimation('enteringRight');
            setTimeout(() => setAnimation('idle'), 15);
        }, 100);

    }

    return (
        <div
            className="flex flex-1 flex-col items-center justify-center min-h-screen  order-1 md:order-2">
            <div className={`w-full flex flex-1 flex-col items-center justify-center`}>
                <h1 className="text-3xl font-bold ">
                    {currentCard ? (wordsList.indexOf(currentCard)+ 1 + wordsList.length) % wordsList.length + 1 : "No wordsList available"}
                    /
                    {wordsList.length}
                </h1>
                <div className={`${ANIMATION_CLASSES[animation]} flex h-5/6 w-full items-center justify-center`}>
                    <FlipCard frontText={frontText} backText={backText}></FlipCard>
                </div>
            </div>

            <div className="flex flex-row justify-between w-2/4 md:w-1/3 h-1/6 gap-10 mb-20 md:mb-0">
                <button className="bg-indigo-300 text-white px-3 py-1 rounded-md hover:bg-indigo-200 w-1/2 h-1/2"
                        onClick={handlePreviousCard}>
                    Back
                </button>
                <button className="bg-indigo-300 text-white px-3 py-1 rounded-md hover:bg-indigo-200 w-1/2 h-1/2"
                        onClick={handleNextCard}>
                    Next
                </button>
            </div>
        </div>
    )
}