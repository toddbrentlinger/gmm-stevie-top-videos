import React, { useState, useEffect } from 'react';
import './PageNumbers.css';
import { debounce } from '../utility.js';

function PageNumbers(props) {
    const [numDisplayedButtons, setNumDisplayedButtons] = useState(5);

    function checkNumDisplayedButtons() {
        let newValue;
        if (window.matchMedia("(max-width: 480px)").matches)
            newValue = 3;
        else if (window.matchMedia("(max-width: 750px)").matches)
            newValue = 5;
        else
            newValue = 7;
        if (newValue !== numDisplayedButtons)
            setNumDisplayedButtons(newValue);
    }

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            console.log("Change numDisplayedButtons");
            checkNumDisplayedButtons();
        }, 1000);

        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

    function goPrevPage() {
        // Return if currPage is 1
        if (props.currPage === 1)
            return;

        props.setCurrPage(props.currPage - 1);
    }

    function goNextPage() {
        // Return if currPage is last page
        if (props.currPage === getLastPageNum())
            return;

        props.setCurrPage(props.currPage + 1);
    }

    function getLastPageNum() {
        return Math.ceil(props.maxResults / props.resultsPerPage);
    }

    function createNumberedPageButtons() {
        let numberedPageButtons = [];
        for (let i = 1; i <= numDisplayedButtons; i++) {
            numberedPageButtons.push(
                <button key={i}>{i}</button>
            );
        }
        return numberedPageButtons;
    }

    return (
        <div className="page-button-container">
            <button onClick={goPrevPage}>PREV</button>
            <button onClick={() => props.setCurrPage(1)}>FIRST</button>
            <div className="page-number-container">
                {createNumberedPageButtons()}
            </div>
            <button onClick={() => props.setCurrPage(getLastPageNum())}>LAST</button>
            <button onClick={goNextPage}>NEXT</button>
        </div>
    );
}

export default PageNumbers;