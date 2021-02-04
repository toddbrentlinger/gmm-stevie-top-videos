import React from 'react';
import { addCommasToNumber } from '../utility.js';
import './VideoElement.css';
import CommentList from './CommentList.js';

function VideoElement(props) {
    function createSrcSet() {
        let srcSet = "";
        const thumbnailKeys = Object.keys(props.videoObj.thumbnails);
        for (let i = 0; i < thumbnailKeys.length; i++) {
            srcSet += `${props.videoObj.thumbnails[thumbnailKeys[i]].url} ${props.videoObj.thumbnails[thumbnailKeys[i]].width}w`;
            if (i < thumbnailKeys.length - 1)
                srcSet += ", ";
        }
        return srcSet;
    }

    return (
        <li>
            <div className="video-data-container">
                <div className="thumbnail-container">
                    <a href={"https://www.youtube.com/watch?v=" + props.videoObj.videoId}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            srcSet={createSrcSet()}
                            src={props.videoObj.thumbnails.default.url}
                            width={props.videoObj.thumbnails.default.width}
                            height={props.videoObj.thumbnails.default.height}
                            alt={`YouTube thumbnail for video ID: ${props.videoObj.videoId}`}
                        />
                    </a>
                </div>
                <h2 className="title">{props.videoObj.title}</h2>
                <p className="description">{props.videoObj.description.split("\n")[0]}</p>
                <div className="total-comments">{`Total Stevie Comments: ${addCommasToNumber(props.videoObj.totalComments)}`}</div>
                <div className="total-likes">{`Total Likes: ${addCommasToNumber(props.videoObj.totalLikes)}`}</div>
                <div className="total-replies">{`Total Replies: ${addCommasToNumber(props.videoObj.totalReplies)}`}</div>
            </div>
            <CommentList comments={props.videoObj.comments} />
        </li>
    );
}

export default VideoElement;