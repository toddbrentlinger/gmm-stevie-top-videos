import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import VideoList from './components/VideoList.js';
import PageNumbers from './components/PageNumbers.js';
import FooterCustom from './components/FooterCustom.js';
/*
const initialState = {
    'display': { 'gmm': false, 'gmmore': false },
    'data': { 'gmm': [], 'gmmore': [] }
};

function getPromiseFromFetchOfJSON(url) {
    return fetch(url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => response.json());
}

async function reducer(state, action) {
    console.log('reducer started');
    console.log('state:');
    console.log(state);
    console.log(`action: ${action}`);
    let newState;
    switch (action) {
        case 'gmm':
            // Check if need to fetch
            if (!state.data.gmm.length) {
                await getPromiseFromFetchOfJSON(
                    './data/gmmStevieVideoListSorted.json'
                ).then(function (data) {
                    console.log("Get GMM videos");
                    newState = {
                        'display': { 'gmm': true, 'gmmore': false },
                        'data': { 'gmm': data, 'gmmore': state.data.gmmore }
                    };
                });
            } else {
                newState = {
                    'display': { 'gmm': true, 'gmmore': false },
                    'data': state.data
                };
            }
            break;

        case 'gmmore':
            // Check if need to fetch
            if (!state.data.gmmore.length) {
                await getPromiseFromFetchOfJSON(
                    './data/gmMoreStevieVideoListSorted.json'
                ).then(function (data) {
                    console.log("Get GMMore videos");
                    newState = {
                        'display': { 'gmm': false, 'gmmore': true },
                        'data': { 'gmm': state.data.gmm, 'gmmore': data }
                    };
                });
            } else {
                newState = {
                    'display': { 'gmm': false, 'gmmore': true },
                    'data': state.data
                };
            }
            break;

        case 'both':
            // Check if need to fetch
            if (!state.data.gmm.length || !state.data.gmmore.length) {
                let promiseArr = [];
                if (!state.data.gmm.length) {
                    promiseArr.push(
                        await getPromiseFromFetchOfJSON('./data/gmmStevieVideoListSorted.json')
                    );
                } else {
                    promiseArr.push(null);
                }
                if (!state.data.gmmore.length) {
                    promiseArr.push(
                        await getPromiseFromFetchOfJSON('./data/gmMoreStevieVideoListSorted.json')
                    );
                } else {
                    promiseArr.push(null);
                }
                Promise.all(promiseArr).then(dataArr => {
                    let newDataObj;
                    // If GMM & GMMore data is fetched
                    if (dataArr[0] && dataArr[1]) {
                        newDataObj = { 'gmm': dataArr[0], 'gmmore': dataArr[1] };
                    }
                    // Else If only GMM data is fetched
                    else if (dataArr[0]) {
                        newDataObj = { ...state.data, 'gmm': dataArr[0] };
                    }
                    // Else If only GMMore data is fetched
                    else if (dataArr[1]) {
                        newDataObj = { ...state.data, 'gmmore': dataArr[1] };
                    }
                    else {
                        newDataObj = { ...state.data };
                    }
                    newState = {
                        'display': { 'gmm': true, 'gmmore': true },
                        'data': newDataObj
                    };
                });
            } else {
                newState = {
                    'display': { 'gmm': true, 'gmmore': true },
                    'data': state.data
                };
            }
            break;

        default:
            newState = state;
    }
    console.log('newState:');
    console.log(newState);
    return newState;
}
*/
function App() {
    const [displayedChannels, setDisplayedChannels] = useState({
        'gmm': true,
        'gmmore': false,
    });
    const [videoData, setVideoData] = useState({
        'gmm': [],
        'gmmore': [],
    });
    //const [dataState, dataDispatch] = useReducer(reducer, initialState);
    const [videoList, setVideoList] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    function getPromiseFromFetchOfJSON(url) {
        return fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then((response) => response.json());
    }

    function getVideoData() {
        console.log(
            'getVideoData has started\n',
            'Initial State Values:\n',
            `displayedChannels: { gmm: ${displayedChannels.gmm} gmmore: ${displayedChannels.gmmore} }\n`,
            `videoData: { gmm: ${videoData.gmm.length} gmmore: ${videoData.gmmore.length} }`
        );
        let promiseArr = [];
        if (displayedChannels.gmm && !videoData.gmm.length) {
            promiseArr.push(
                getPromiseFromFetchOfJSON('./data/gmmStevieVideoListSorted.json')
            );
        } else {
            promiseArr.push(null);
        }
        if (displayedChannels.gmmore && !videoData.gmmore.length) {
            promiseArr.push(
                getPromiseFromFetchOfJSON('./data/gmMoreStevieVideoListSorted.json')
            );
        } else {
            promiseArr.push(null);
        }
        Promise.all(promiseArr).then(dataArr => {
            setVideoData(prevVideoData => {
                const newVideoData = {
                    'gmm': dataArr[0] ? dataArr[0] : prevVideoData.gmm,
                    'gmmore': dataArr[1] ? dataArr[1] : prevVideoData.gmmore,
                };
                console.log('Promise.all inside getVideoData has ended');
                createVideoList(newVideoData);
                return newVideoData;
            });
        });

        /*
        // Good Mythical Morning
        if (displayedChannels.gmm && !videoData.gmm.length) {
            
            //axios.get('./data/gmmeStevieVideoListSorted.json')
            //    .then(response => {
            //        console.log("Get GMM videos");
            //        console.log(response.data);
            //    });
            
            fetch('./data/gmmStevieVideoListSorted.json',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            ).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("Get GMM videos");
                setVideoData({
                    ...videoData,
                    'gmm': data,
                });
            });
        }

        // Good Mythical More
        if (displayedChannels.gmmore && !videoData.gmmore.length) {
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
                        //console.log("Success");
                        setVideoData({
                            ...videoData,
                            'gmmore': JSON.parse(request.responseText),
                        });
                    } else {
                        // Oh no! There has been an error with the request!
                        console.log("Get GMMore videos");
                        console.log("Failure");
                    }
                }
            };
            request.send();
        }
        */
    }

    function createVideoList(newVideoData) {
        console.log(
            'createVideoList() has started\n',
            'Parameter:\n',
            `newVideoData: { gmm: ${newVideoData.gmm.length} gmmore: ${newVideoData.gmmore.length} }\n`,
            'Initial State Values:\n',
            `displayedChannels: { gmm: ${displayedChannels.gmm} gmmore: ${displayedChannels.gmmore} }\n`,
            `videoData: { gmm: ${videoData.gmm.length} gmmore: ${videoData.gmmore.length} }`
        );
        let newVideoList = [];
        if (displayedChannels.gmm)
            newVideoList = newVideoList.concat(newVideoData.gmm);
        if (displayedChannels.gmmore)
            newVideoList = newVideoList.concat(newVideoData.gmmore);
        newVideoList.sort((first, second) => {
            // If comments are equal, sort by likes
            return (first.totalComments === second.totalComments)
                ? second.totalCommentLikes - first.totalCommentLikes
                : second.totalComments - first.totalComments;
        });
        setVideoList(newVideoList);
        console.log('createVideoList() has ended');
        //return newVideoList;
    }
    /*
    // TODO: Convert to videoList useState and/or useEffect that only changes
    // when displayedChannels changes or videoData changes
    // ISSUE: Runs with each page change
    function createVideoListOld() {
        console.log('createVideoList() has started');
        console.log('Initial State Values:');
        console.log(`displayedChannels: { gmm: ${displayedChannels.gmm} gmmore: ${displayedChannels.gmmore} }`);
        console.log(`videoData: { gmm: ${videoData.gmm.length} gmmore: ${videoData.gmmore.length} }`);
        let newVideoList = [];
        if (displayedChannels.gmm)
            newVideoList = newVideoList.concat(videoData.gmm);
        if (displayedChannels.gmmore)
            newVideoList = newVideoList.concat(videoData.gmmore);
        newVideoList.sort((first, second) => {
            // If comments are equal, sort by likes
            return (first.totalComments === second.totalComments)
                ? second.totalCommentLikes - first.totalCommentLikes
                : second.totalComments - first.totalComments;
        });
        setVideoList(newVideoList);
        console.log('createVideoList() has ended');
        //return newVideoList;
    }
    */

    //const videoList = createVideoList();
    useEffect(getVideoData, [displayedChannels]);
    //useEffect(createVideoList, [displayedChannels]);

    return (
        <div className="App">
            <header
                id="top-page"
                className="App-header"
            >
                GMM Stevie Top Videos
            </header>
            <div id="channel-select-btn-container">
                <button
                    className={"custom-button" + (displayedChannels.gmm && !displayedChannels.gmmore ? " active" : "")}
                    onClick={(e) => {
                        e.preventDefault();
                        setDisplayedChannels({
                            'gmm': true,
                            'gmmore': false,
                        });
                        setCurrPage(1);
                    }}
                >GMM</button>
                <button
                    className={"custom-button" + (!displayedChannels.gmm && displayedChannels.gmmore ? " active" : "")}
                    onClick={(e) => {
                        e.preventDefault();
                        setDisplayedChannels({
                            'gmm': false,
                            'gmmore': true,
                        });
                        setCurrPage(1);
                    }}
                >GMMore</button>
                <button
                    className={"custom-button" + (displayedChannels.gmm && displayedChannels.gmmore ? " active" : "")}
                    onClick={(e) => {
                        e.preventDefault();
                        setDisplayedChannels({
                            'gmm': true,
                            'gmmore': true,
                        });
                        setCurrPage(1);
                    }}
                >Both</button>
            </div>
            <div hidden={true}>
                <div>GMM Displayed: {displayedChannels.gmm ? "TRUE" : "FALSE"}</div>
                <div>GMM Videos Saved: {videoData ? videoData.gmm.length : videoData}</div>
                <div>GMMore Displayed: {displayedChannels.gmmore ? "TRUE" : "FALSE"}</div>
                <div>GMMore Videos Saved: {videoData ? videoData.gmmore.length : videoData}</div>
            </div>
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={videoList.length} //props.videoList.length
            />
            <VideoList
                videoList={videoList} //props.videoList
                currPage={currPage}
                resultsPerPage={resultsPerPage}
            />
            <PageNumbers
                currPage={currPage}
                resultsPerPage={resultsPerPage}
                setCurrPage={setCurrPage}
                maxResults={videoList.length} //props.videoList.length
                scrollToTop={true}
            />
            <FooterCustom />
        </div>
    );
}

export default App;
