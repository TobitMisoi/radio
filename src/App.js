import Radio from "./radio";
import "react-h5-audio-player/lib/styles.css"

function App() {
  return (
    <div>
      <div className="App">
        <h1>Super-duper radio player</h1>
        <h2>Pick a genre, choose a station, start listening</h2>
        <Radio />
      </div>
    </div>
  );
}

export default App;
