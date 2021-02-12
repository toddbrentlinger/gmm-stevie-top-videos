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
        'gmmore': false,
    });
    const [videoData, setVideoData] = useState({
        'gmm': [],
        'gmmore': [],
    });
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    function getVideoData() {
        console.log('displayedChannels: ', displayedChannels);
        console.log('videoData: ', videoData);
        // Good Mythical Morning
        if (displayedChannels.gmm && !videoData.gmm.length) {
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
                //console.log(response);
                return response.json();
            }).then(function (data) {
                console.log("Get GMM videos");
                //console.log(data);
                setVideoData({
                    ...videoData,
                    'gmm': data,
                });
                //console.log(videoData);
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
                        //console.log(JSON.parse(request.responseText));
                        setVideoData({
                            ...videoData,
                            'gmmore': JSON.parse(request.responseText),
                        });
                        //console.log(videoData);
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
    }

    useEffect(getVideoData, [displayedChannels]);

    function getVideoList() {
        let videoList = [];
        if (displayedChannels.gmm)
            videoList = videoList.concat(videoData.gmm);
        if (displayedChannels.gmmore)
            videoList = videoList.concat(videoData.gmmore);
        videoList.sort((first, second) => {
            // If comments are equal, sort by likes
            return (first.totalComments === second.totalComments)
                ? second.totalCommentLikes - first.totalCommentLikes
                : second.totalComments - first.totalComments;
        });
        return videoList;
    }
    const videoList = getVideoList();

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
                    }}
                >GMM</button>
                <button
                    onClick={() => {
                        setDisplayedChannels({
                            'gmm': false,
                            'gmmore': true,
                        });
                    }}
                >GMMore</button>
                <button
                    onClick={() => {
                        setDisplayedChannels({
                            'gmm': true,
                            'gmmore': true,
                        });
                    }}
                >Both</button>
            </div>
            <div>GMM Displayed: {displayedChannels.gmm ? "TRUE" : "FALSE"}</div>
            <div>GMM Videos Saved: {videoData.gmm.length}</div>
            <div>GMMore Displayed: {displayedChannels.gmmore ? "TRUE" : "FALSE"}</div>
            <div>GMMore Videos Saved: {videoData.gmmore.length}</div>
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
