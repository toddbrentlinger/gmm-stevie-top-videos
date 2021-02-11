import React, { useState, useEffect, useCallback } from 'react';
//import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import VideoList from './components/VideoList.js';
import PageNumbers from './components/PageNumbers.js';
import FooterCustom from './components/FooterCustom.js';

function App(props) {
    const [displayedChannels, setDisplayedChannels] = useState({
        'gmm': true,
        'gmmore': true,
    });
    const [videoList, setVideoList] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const getVideoList = useCallback(() => {
        // Good Mythical Morning
        if (displayedChannels.gmm) {
            /*
            axios.get('./data/gmmeStevieVideoListSorted.json')
                .then(response => {
                    console.log("Get GMM videos");
                    console.log(response.data);
                });
            */
            fetch('./data/gmmStevieVideoListSorted.json',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            ).then(function (response) {
                console.log(response);
                return response.json();
            }).then(function (data) {
                console.log("Get GMM videos");
                console.log(data);
            });
            
        }

        // Good Mythical More
        if (displayedChannels.gmmore) {
            let requestURL = './data/gmMoreStevieVideoListSorted.json';
            let request = new XMLHttpRequest();
            request.open('GET', requestURL);

            //request.responseType = 'json';
            request.onreadystatechange = function () {
                // In local files, status is 0 upon success in Mozilla Firefox
                if (request.readyState === XMLHttpRequest.DONE) {
                    const status = request.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                        // The request has been completed successfully
                        console.log("Get GMMore videos");
                        console.log("Success");
                        console.log(JSON.parse(request.responseText));
                    } else {
                        // Oh no! There has been an error with the request!
                        console.log("Get GMMore videos");
                        console.log("Failure");
                    }
                }
            };
            /*
            request.onload = function () {
                console.log("Request has loaded");
                console.log(request.response);
                setVideoList(request.response);
            };
            */
            request.send();
        }

        //setVideoList(tempVideoList);
        //return tempVideoList;
    }, [displayedChannels]);

    useEffect(getVideoList, [getVideoList]);

    return (
        <div className="App">
            <header
                id="top-page"
                className="App-header"
            >
                GMM Stevie Top Videos
            </header>
            <div>{videoList}</div>
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
                scrollToTop={true}
            />
            <FooterCustom />
        </div>
    );
}

export default App;
