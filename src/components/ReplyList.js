import React from 'react';
import parse from 'html-react-parser';
import Accordion from './Accordion.js';
import { addCommasToNumber } from '../utility.js';

function Reply(props) {
    return (
        <li className="reply-container">
            <div className="reply">{parse(props.reply)}</div>
            <div className="reply-author">{`Author: ${props.author}`}</div>
            <div className="reply-likes">{`Likes: ${addCommasToNumber(props.likes)}`}</div>
        </li>
    );
}

function ReplyList(props) {
    let replyComponentArr = [];
    if (props.replies.length) {
        props.replies.forEach((replyObj, index) => {
            replyComponentArr.push(
                <Reply
                    key={index}
                    reply={replyObj.reply}
                    author={replyObj.authorName}
                    likes={replyObj.likeCount}
                />
            );
        });
    }

    return (
        <div className="reply-list-container">
            <Accordion title="Top Stevie Replies:">
                <ol>{replyComponentArr}</ol>
            </Accordion>
        </div>
    );
}

export default ReplyList;