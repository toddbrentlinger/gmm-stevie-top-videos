import React, { useState } from 'react';

function PageNumbers(props) {
    const [numDisplayedButtons, setNumDisplayedButtons] = useState(5);

    return (
        <div className="page-number-container">
            <button onClick={props.goPrevPage}>PREV</button>
            <button onClick={props.goFirstPage}>FIRST</button>
            <button onClick={props.goLastPage}>LAST</button>
            <button onClick={props.goNextPage}>NEXT</button>
        </div>
    );
}

export default PageNumbers;