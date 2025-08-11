import {useLocation, useNavigate} from "react-router";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Word} from "../store/Types";
import {toggleLayout} from "../store/actions";
import {CardsMenu} from "./CardsMenu";
import {faBars, faCreditCard, faDiamond, faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Layout({children}: any) {
    //TODO rework bo poganij design and add for phones
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLayoutOpen = useSelector((state: { words: Word[], isLayoutOpen: boolean }) => state.isLayoutOpen);

    const handleToggleLayout = () => {
        dispatch(toggleLayout());
    }

    return (
        <>
            <CircleMenu>
                <div className='flex-1 w-screen h-screen'>{children}</div>
            </CircleMenu>
        </>
    );


}

function CircleMenu({children}: any) {
    const [openLeft, setOpenLeft] = useState(false);

    return (
        <div>
            <div className={`circular-menu circular-menu-left ${openLeft ? 'active' : ''}`}>
                <button
                    type="button"
                    className="floating-btn"
                    onClick={() => setOpenLeft((v) => !v)}
                    aria-expanded={openLeft}
                    aria-label="Toggle circular menu left"
                >
                    <FontAwesomeIcon className='size-5/12' icon={faBars}/>
                </button>

                <menu className="items-wrapper">
                    <a href="#" className="menu-item" aria-label="Home">
                        <FontAwesomeIcon icon={faHome}/>
                    </a>
                    <a href="#" className="menu-item" aria-label="Stats">
                        <FontAwesomeIcon icon={faDiamond}/>
                    </a>
                    <a href="#" className="menu-item" aria-label="Settings"></a>
                </menu>
            </div>
            {children}
        </div>
    );
}
