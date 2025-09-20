import React, {useEffect, useState} from "react";

type FlipCardProps = {
    frontText?: string;
    backText?: string;
    frontColor?: string;
    backColor?: string;
    width?: string;
    height?: string;
}

export function FlipCard({
                             frontText,
                             backText,
                             frontColor = 'bg-indigo-200',
                             backColor = 'bg-white',
                             width='md:w-8/12 ',
                             height='md:h-4/6'
                         }: FlipCardProps) {
    const [flipped, setFlipped] = useState(false);
    const [isAnimated, setIsAnimated] = useState(true);

    useEffect(() => {
        setIsAnimated(false);
        setFlipped(false);

        const id = setTimeout(() => setIsAnimated(true), 10);
        clearTimeout(id);
    }, [frontText, backText, frontColor, backColor, width, height]);

    const handleFlip = () => {
        setIsAnimated(true);
        setFlipped(f => !f);
    };

    // ${width} ${height}

    return (
        <div
            className={`relative w-11/12 h-96 md:w-3/4 md:h-3/4 cursor-pointer [perspective:1000px]`}
            onClick={handleFlip}
        >
            <div
                className={`absolute w-full h-full [transform-style:preserve-3d] 
                    ${isAnimated ? "transition-transform duration-300" : ""}
                    ${flipped ? "[transform:rotateY(-180deg)]" : ""}`}
            >
                {/* front */}
                <div
                    className={`absolute w-full h-full ${frontColor} rounded-xl shadow-md flex items-center justify-center [backface-visibility:hidden] p-2`}>
                    <div
                        className="text-center text-3xl font-bold text-wrap break-words overflow-hidden whitespace-normal p-4 overflow-y-auto max-h-full">
                        {frontText}
                    </div>
                </div>
                {/* back */}
                <div
                    className={`absolute w-full h-full ${backColor} rounded-xl shadow-md flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] p-2`}>
                    <div
                        className="text-center text-3xl text-wrap break-words overflow-hidden whitespace-normal p-4 overflow-y-auto max-h-full">
                        {backText}
                    </div>
                </div>
            </div>
        </div>
    );
}