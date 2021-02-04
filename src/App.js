import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import VideoList from './components/VideoList.js';
import PageNumbers from './components/PageNumbers.js';
import FooterCustom from './components/FooterCustom.js';

function App(props) {
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    return (
        <div className="App">
            <header className="App-header">GMM Stevie Top Videos</header>
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={props.videoList.length}
            />
            <VideoList
                videoList={props.videoList}
                currPage={currPage}
                resultsPerPage={resultsPerPage}
            />
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={props.videoList.length}
            />
            <FooterCustom />
        </div>
    );
}

export default App;
