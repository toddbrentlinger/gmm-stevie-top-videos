import React, { useState } from 'react';
import './AccordionButton.css';

function AccordionButton(props) {
    const [isActive, setIsActive] = useState(false);

    function toggleAccordion() {
        /* Toggle between adding and removing the 'active' class,
         to highlight the button that controls the panel */
        setIsActive(!isActive);

        // Toggle between hiding and showing the active panel
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
    }

    return (
        <button
            className={"accordion" + (isActive ? " active" : "")}
            onClick={() => toggleAccordion().bind(this)}
        >
            {props.children}
        </button>
    );
}

export default AccordionButton;