"use strict";

import React from 'react';

function VideoElement(props) {
    return (
        <li>
            <div className="video-data-container">
                <div className="thumbnail-container">
                    <a href="https://www.youtube.com/watch?v=2KoVXYGfzDY" target="_blank">
                        <img 
                             srcset="
                                https://i.ytimg.com/vi/hs6W2zMaZpg/maxresdefault.jpg 1280w,
                                https://i.ytimg.com/vi/hs6W2zMaZpg/sddefault.jpg 640w,
                                https://i.ytimg.com/vi/hs6W2zMaZpg/hqdefault.jpg 480w,
                                https://i.ytimg.com/vi/hs6W2zMaZpg/mqdefault.jpg 320w,
                                https://i.ytimg.com/vi/hs6W2zMaZpg/default.jpg 120w
                             "
                             src="https://i.ytimg.com/vi/hs6W2zMaZpg/sddefault.jpg"
                             width="640"
                             height="480"
                             alt="YouTube video thumbnail"
                        />
                    </a>
                </div>
                <h2 className="title">Rhett's Dad Watches Embarrassing Rhett Clips</h2>
                <p className="description">This week, Stevie sits down with Rhett's dad to watch embarrassing Rhett clips, she reveals a clip from when Link thought the cameras had stopped rolling, and tries out some new catch phrases... Let's Talk About That! LTAT #0001</p>
                <div className="total-comments">Total Stevie Comments: 2,092</div>
                <div className="total-likes">Total Likes: 41,378</div>
                <div className="total-replies">Total Replies: 518</div>
            </div>
            <div className="comment-list-container">
                <h3>Top Stevie Comments:</h3>
                <ol>
                    <li className="comment-container">
                        <div className="comment">Any time with Stevie makes a delightful time. Loved LTAT, keep it up! Don&#39;t be nervous Stevie just be you and that&#39;ll be gold.</div>
                        <div className="comment-likes">Likes: 12,172</div>
                        <div className="comment-replies">Replies: 65</div>
                    </li>
                </ol>
            </div>
        </li>
    );
}

export default VideoElement;