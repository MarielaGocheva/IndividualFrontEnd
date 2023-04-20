import React from "react";
import "./SearchResult.css"

export default function SearchResult({result, chooseResult}) {
    function handleChoice() {
        chooseResult(result);
      }
  return (
    <>
      <div id="search-row-client" className="background-search-client" onClick={handleChoice}>
        <div className="result-container" style={{ cursor: "pointer" }}>
          <img src={result.imageUrl} alt="result-img" />
          <div className="result-details">
            <div className="result-title">{result.title ? result.title : result.fname + " " + result.lname}</div>
            <div className="result-artist">{}</div>
          </div>
          {/* <div className="add-button">
            <button type="input" onClick={handleShowOptions}>
              <img src={addSong}></img>
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
