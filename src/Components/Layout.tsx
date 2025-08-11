import {useLocation, useNavigate} from "react-router";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Word} from "../store/Types";
import {toggleLayout} from "../store/actions";
import {CardsMenu} from "./CardsMenu";
import {faBars, faCog, faCreditCard, faDiamond, faHome} from "@fortawesome/free-solid-svg-icons";
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
                    <FontAwesomeIcon className='mt-1 size-5/12' icon={faBars}/>
                </button>

                <menu className="items-wrapper">
                    <a href="/cards" className="menu-item" aria-label="Home">
                        <FontAwesomeIcon icon={faHome}/>
                    </a>
                    <a href="/cards" className="menu-item" aria-label="Stats">
                        <FontAwesomeIcon icon={faDiamond}/>
                    </a>
                    <a href="/cards" className="menu-item" aria-label="Settings">
                        <FontAwesomeIcon icon={faCog}/>
                    </a>
                </menu>
            </div>
            {children}
        </div>
    );
}
