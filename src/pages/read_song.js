import React from "react";
import JSONData from "../../data/songs.json";
import { chordify } from "../utils/chordify.js";

const SongPage = (fontSize) => {
  const [modalContent, setModalContent] = React.useState(null);
  const [songs, setSongs] = React.useState(null);
  
  const handleMouseEnter = (chord, event) => {
    if (modalContent !== null) {
      setModalContent(null);
      console.log("songs", songs);
      return;
    }
    const { clientX, clientY } = event;
    const { scrollX, scrollY } = window;
    const adjustedX = clientX + scrollX;
    const adjustedY = clientY + scrollY;
    setModalContent(
      <div
        style={{
          position: "absolute",
          top: `${adjustedY}px`,
          left: `${adjustedX}px`,
          transform: "translate(10px, -50%)",
          backgroundColor: "#fff",
          padding: "0.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          pointerEvents: "none",
          cursor: "help",
        }}
      >
        <img
          src="/static/chord_.png"
          alt="Chord Diagram"
          style={{ maxWidth: fontSize * 6.25 }}
        />
            <p style={{ textAlign: "center", marginTop: "0.5rem" }}>{chord.replace("(", "").replace(")", "")}</p>
      </div>
    );
  };

  const handleMouseLeave = () => setModalContent(null);
  // if (songs === null)
  React.useEffect(() => {
    fetch('/.netlify/functions/get-songs')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched songs:", data);
        setSongs(data)
  });
    const chords = document.querySelectorAll(".chord");
    chords.forEach((chord) => {
      chord.addEventListener("mouseenter", (e) =>
        handleMouseEnter(chord.textContent, e)
      );
      chord.addEventListener("mouseleave", handleMouseLeave);
      if (modalContent === null)
        chord.addEventListener("click", (e) => {
          handleMouseEnter(chord.textContent, e);
        });
      else
        chord.addEventListener("click", () => {
          handleMouseLeave();
        });
    });
    return () => {
      chords.forEach((chord) => {
        chord.removeEventListener("mouseenter", (e) =>
          handleMouseEnter(chord.textContent, e)
        );
        chord.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [songs, modalContent]);

  const JSONbuildtime = () => (
    <div
      style={{
        maxWidth: `960px`,
        margin: `1.45rem auto`,
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >

      {JSONData.songs.map((data, index) => {
        return (
          <>
            {modalContent}
            <div
              key={`song_${index}`}
              style={{
                marginBottom: "2rem",
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontFamily: "monospace",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              className="song"
            >
              <h1
                style={{
                  fontSize: `${fontSize * 2}px`,
                  color: "#333",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                {data.title}
              </h1>
              <span style={{ fontSize: `${fontSize}px`, color: "#555" }}>
                {data.lines.map((line, i) => (
                  <React.Fragment key={i}>
                    {chordify(line)}
                    {i < data.lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#444",
          marginBottom: "1.5rem",
        }}
      >
        Song List
      </h1>
      {JSONbuildtime()}
    </div>
  );
};

export default SongPage;

// export const Head = () => <title>Home Page</title>;
