import React from 'react';
import VideoElement from './VideoElement.js';
import './VideoList.css';

function VideoList(props) {
    // Start and end index of videoList to display
    const start = (props.currPage - 1) * props.resultsPerPage;
    const end = Math.min(start + props.resultsPerPage, props.videoList.length);
    let displayedVideoElements = [];
    for (let i = start; i < end; i++) {
        displayedVideoElements.push(
            <VideoElement
                key={i}
                videoObj={props.videoList[i]}
            />
        );
    }

    return (
        <ol>{displayedVideoElements}</ol>
    );
}

export default VideoList;