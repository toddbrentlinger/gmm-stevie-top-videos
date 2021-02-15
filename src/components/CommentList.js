import React from 'react';
import parse from 'html-react-parser';
import Accordion from './Accordion.js';
import { addCommasToNumber } from '../utility.js';
import ReplyList from './ReplyList.js';

function Comment(props) {
    return (
        <li className="comment-container">
            <div className="comment">{parse(props.comment)}</div>
            <div className="comment-author">{`Author: ${props.author}`}</div>
            <div className="comment-likes">{`Likes: ${addCommasToNumber(props.likes)}`}</div>
            <div className="comment-replies">{`Replies: ${addCommasToNumber(props.replyCount)}`}</div>
            {(props.replies.length) ? <ReplyList replies={props.replies} /> : null}
        </li>
    );
}

function CommentList(props) {
    let commentComponentArr = [];
    if (props.comments.length) {
        props.comments.forEach((commentObj, index) => {
            commentComponentArr.push(
                <Comment
                    key={index}
                    comment={commentObj.topLevelComment}
                    author={commentObj.authorName}
                    likes={commentObj.likeCount}
                    replyCount={commentObj.replyCount}
                    replies={commentObj.replies}

                />
            );
        });
    }

    return (
        <div className="comment-list-container">
            <Accordion title="Top Stevie Comments:">
                <ol>{commentComponentArr}</ol>
            </Accordion>
        </div>
    );
}

export default CommentList;