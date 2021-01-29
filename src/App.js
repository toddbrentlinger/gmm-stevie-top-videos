import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import VideoList from './components/VideoList.js';
import PageNumbers from './components/PageNumbers.js';

function App(props) {
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    function goPrevPage() {
        // Return if currPage is 1
        if (currPage === 1)
            return;

        goPageNumber(currPage - 1);
    }

    function goFirstPage() {
        goPageNumber(1);
    }

    function goPageNumber(num) {
        // Return if num is NOT within range
        if (num < 1 || num > getLastPageNum())
            return;

        setCurrPage(num);
    }

    function goLastPage() {
        goPageNumber(getLastPageNum());
    }

    function goNextPage() {
        // Return if currPage is last page
        if (currPage === getLastPageNum())
            return;

        goPageNumber(currPage + 1);
    }

    function getLastPageNum() {
        return Math.ceil(props.videoList.length / resultsPerPage);
    }

    return (
        <div className="App">
            <header className="App-header">GMM Stevie Top Videos</header>
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                goPrevPage={goPrevPage}
                goFirstPage={goFirstPage}
                goPageNumber={goPageNumber}
                goLastPage={goLastPage}
                goNextPage={goNextPage}
            />
            <VideoList
                videoList={props.videoList}
                currPage={currPage}
                resultsPerPage={resultsPerPage}
            />
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                goPrevPage={goPrevPage}
                goFirstPage={goFirstPage}
                goPageNumber={goPageNumber}
                goLastPage={goLastPage}
                goNextPage={goNextPage}
            />
        </div>
    );
}

export default App;
