import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import stevieVideoArr from './data/gmmStevieVideoListSorted.json';

// Sort video list
stevieVideoArr.sort((first, second) => {
    // If comments are equal, sort by likes
    return (first.comments === second.comments)
        ? second.likes - first.likes
        : second.comments - first.comments;
});

ReactDOM.render(
    <React.StrictMode>
        <App videoList={stevieVideoArr} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
