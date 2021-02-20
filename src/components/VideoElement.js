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

    function getLikePercentage(likes, dislikes) {
        return ( (likes / (likes + dislikes)) * 100 ).toFixed(1);
    }

    function createPublishedDateString(dateStr_ISO_8601) {
        const months = [
            'Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        const tempDate = new Date(dateStr_ISO_8601);
        return `${months[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getFullYear()}`;
    }

    return (
        <li>
            <div className="video-data-container">
                <h2 className="title">{`${props.index + 1}. | ${props.videoObj.title}`}</h2>
                <div className="thumbnail-container">
                    <a href={"https://www.youtube.com/watch?v=" + props.videoObj.videoId}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            srcSet={createSrcSet()}
                            sizes="50vw"
                            src={props.videoObj.thumbnails.default.url}
                            width={props.videoObj.thumbnails.default.width}
                            height={props.videoObj.thumbnails.default.height}
                            alt={`YouTube thumbnail for video ID: ${props.videoObj.videoId}`}
                        />
                    </a>
                </div>
                <p className="description">{props.videoObj.description.split("\n")[0]}</p>
                <div className="published-date">{`Published: ${createPublishedDateString(props.videoObj.publishedAt)}`}</div>
                <div className="video-data">
                    <div className="video-views">{`Views: ${addCommasToNumber(props.videoObj.viewCount)}`}</div>
                    <div className="video-likes">
                        {`Likes: ${addCommasToNumber(props.videoObj.likeCount)} (${getLikePercentage(props.videoObj.likeCount, props.videoObj.dislikeCount)}%)`}
                    </div>
                </div>
                <hr/>
                <div className="comments-data">
                    <div className="total-comments">{`Total Stevie Comments: ${addCommasToNumber(props.videoObj.totalComments)}`}</div>
                    <div className="total-likes">{`Total Likes: ${addCommasToNumber(props.videoObj.totalCommentLikes)}`}</div>
                    <div className="total-replies">{`Total Replies: ${addCommasToNumber(props.videoObj.totalCommentReplies)}`}</div>
                </div>
            </div>
            <CommentList comments={props.videoObj.comments} />
        </li>
    );
}

export default VideoElement;