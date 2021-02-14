import React, { useState, useEffect, useReducer } from 'react';
//import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import VideoList from './components/VideoList.js';
import PageNumbers from './components/PageNumbers.js';
import FooterCustom from './components/FooterCustom.js';
/*
const initialState = {
    'gmm': {'display': false, 'data': []},
    'gmmore': { 'display': false, 'data': []}
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
    switch (action) {
        case 'gmm':
            // Check if need to fetch
            if (!state.gmm.data.length) {
                await fetch('./data/gmmStevieVideoListSorted.json',
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
                    return {
                        'gmm': { 'display': true, 'data': data },
                        'gmmore': { 'display': false, 'data': state.gmmore.data }
                    };
                });
                break;
            } else {
                return {
                    'gmm': { 'display': true, 'data': state.gmm.data },
                    'gmmore': { 'display': false, 'data': state.gmmore.data }
                };
            }

        case 'gmmore':
            // Check if need to fetch
            if (!state.gmmore.data.length) {
                await fetch('./data/gmMoreStevieVideoListSorted.json',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                ).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log("Get GMMore videos");
                    return {
                        'gmm': { 'display': false, 'data': state.gmm.data },
                        'gmmore': { 'display': true, 'data': data }
                    };
                });
                break;
            } else {
                return {
                    'gmm': { 'display': false, 'data': state.gmm.data },
                    'gmmore': { 'display': true, 'data': state.gmmore.data }
                };
            }

        case 'both':
            // Check if need to fetch
            if (!state.gmm.data.length || !state.gmmore.data.length) {
                let promiseArr = [];
                if (!state.gmm.data.length) {
                    promiseArr.push(
                        getPromiseFromFetchOfJSON('./data/gmmStevieVideoListSorted.json')
                    );
                } else {
                    promiseArr.push(null);
                }
                if (!state.gmmore.data.length) {
                    promiseArr.push(
                        getPromiseFromFetchOfJSON('./data/gmMoreStevieVideoListSorted.json')
                    );
                } else {
                    promiseArr.push(null);
                }
                await Promise.all(promiseArr).then(dataArr => {
                    // If GMM & GMMore data is fetched
                    if (dataArr[0] && dataArr[1]) {
                        return {
                            'gmm': { 'display': true, 'data': dataArr[0] },
                            'gmmore': { 'display': true, 'data': dataArr[1] }
                        };
                    }
                    // Else If only GMM data is fetched
                    else if (dataArr[0]) {
                        return {
                            'gmm': { 'display': true, 'data': dataArr[0] },
                            'gmmore': { 'display': true, 'data': state.gmmore.data }
                        };
                    }
                    // Else If only GMMore data is fetched
                    else if (dataArr[1]) {
                        return {
                            'gmm': { 'display': true, 'data': state.gmm.data },
                            'gmmore': { 'display': true, 'data': dataArr[1] }
                        };
                    }
                });
                break;
            } else {
                return {
                    'gmm': { 'display': true, 'data': state.gmm.data },
                    'gmmore': { 'display': true, 'data': state.gmmore.data }
                };
            }

        default:
            return state;
    }
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
        console.log('getVideoData has started');
        console.log(`displayedChannels: { gmm: ${displayedChannels.gmm} gmmore: ${displayedChannels.gmmore} }`);
        console.log(`videoData: { gmm: ${videoData.gmm.length} gmmore: ${videoData.gmmore.length} }`);
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
            // If GMM & GMMore data is fetched
            if (dataArr[0] && dataArr[1]) {
                setVideoData({
                    'gmm': dataArr[0],
                    'gmmore': dataArr[1]
                });
            }
            // Else If only GMM data is fetched
            else if (dataArr[0]) {
                setVideoData({
                    ...videoData,
                    'gmm': dataArr[0],
                });
            }
            // Else If only GMMore data is fetched
            else if (dataArr[1]) {
                setVideoData({
                    ...videoData,
                    'gmmore': dataArr[1],
                });
            }

            createVideoList();
        });
        console.log('getVideoData has ended');
        
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
    
    // TODO: Convert to videoList useState and/or useEffect that only changes
    // when displayedChannels changes or videoData changes
    // ISSUE: Runs with each page change
    function createVideoList() {
        console.log('createVideoList() has started');
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
            <div>
                <button
                    onClick={() => {
                        setDisplayedChannels({
                            'gmm': true,
                            'gmmore': false,
                        });
                        setCurrPage(1);
                    }}
                >GMM</button>
                <button
                    onClick={() => {
                        setDisplayedChannels({
                            'gmm': false,
                            'gmmore': true,
                        });
                        setCurrPage(1);
                    }}
                >GMMore</button>
                <button
                    onClick={() => {
                        setDisplayedChannels({
                            'gmm': true,
                            'gmmore': true,
                        });
                        setCurrPage(1);
                    }}
                >Both</button>
            </div>
            <div>
                <div>GMM Displayed: {displayedChannels.gmm ? "TRUE" : "FALSE"}</div>
                <div>GMM Videos Saved: {videoData.gmm.length}</div>
                <div>GMMore Displayed: {displayedChannels.gmmore ? "TRUE" : "FALSE"}</div>
                <div>GMMore Videos Saved: {videoData.gmmore.length}</div>
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
