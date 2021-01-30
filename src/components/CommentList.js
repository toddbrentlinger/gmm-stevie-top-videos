import React from 'react';
import parse from 'html-react-parser';
import AccordionButton from './AccordionButton.js';
import { addCommasToNumber } from '../utility.js';

function Comment(props) {
    return (
        <li className="comment-container">
            <div className="comment">{parse(props.comment)}</div>
            <div className="comment-likes">{`Likes: ${addCommasToNumber(props.likes)}`}</div>
            <div className="comment-replies">{`Replies: ${addCommasToNumber(props.replies)}`}</div>
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
                    comment={commentObj.comment}
                    likes={commentObj.likes}
                    replies={commentObj.replies}
                />
            );
        });
    }

    return (
        <div className="comment-list-container">
            <AccordionButton>
                Top Stevie Comments:
            </AccordionButton>
            <ol>{commentComponentArr}</ol>
        </div>
    );
}

export default CommentList;