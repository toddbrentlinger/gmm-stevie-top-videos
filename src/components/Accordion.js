import React, { useState, useRef, useEffect } from 'react';
import './Accordion.css';

function Accordion(props) {
    const [isActive, setIsActive] = useState(false);
    const panelRef = useRef(null);

    useEffect(() => {
        panelRef.current.style.maxHeight =
            isActive ?
                panelRef.current.scrollHeight + "px" :
                null;
    });

    return (
        <div className="accordion-container">
            <button
                className={"accordion" + (isActive ? " active" : "")}
                onClick={() => setIsActive(!isActive)}
            >
                {props.title}
            </button>
            <div
                className="panel"
                ref={panelRef}
            >
                {isActive ? props.children : ""}
            </div>
        </div>
    );
}

export default Accordion;