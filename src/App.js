import logo from './logo.svg';
import './App.css';
import VideoElement from './components/VideoElement';

function App(props) {
    console.log("Video List Length: " + props.videoList.length);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
