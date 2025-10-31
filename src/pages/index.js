import React from "react"
import SongPage from "./read_song.js"
import CreateSongPage from "./create_song.js"

const IndexPage = () => {
  const [fontSize, setFontSize] = React.useState(16)
  const [actualView, setActualView] = React.useState("read")
  const increaseFontSize = () => setFontSize((prev) => prev + 2)
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 10))
  const btnStyle = { margin: "5px", marginRight: "1rem", padding: "0.5rem 1rem", backgroundColor: "#0079CC", color: "#000", border: "none", borderRadius: "4px", cursor: "pointer", fontweight: "bold", fontSize: "1rem", transition: "background-color 0.3s" }
  const handleSearchChange = (event) => {
    const searchText = event.target.value
    if (searchText.length > 1) {
      console.log(searchText)
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Top Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "10vh",
          backgroundColor: "#0079CC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          style={{
            width: "50%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={() => {
            console.log("Add new song")
            setActualView("create")
          }}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#fff",
            color: "#0079CC",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Add new song
        </button>
      </div>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          backgroundColor: "#f4f4f4",
          padding: "10px",
          paddingTop: "15vh",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}>
          <button onClick={decreaseFontSize} style={btnStyle}> - </button>
          <button onClick={increaseFontSize} style={btnStyle} > + </button>
        </div>
        <button style={btnStyle}>autodeslizar</button>
        <button style={btnStyle}>transportar</button>
        <button style={btnStyle}>mostrar acordes</button>
        <button style={btnStyle}>cifrado inglés/latino</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          {actualView === "read" && <SongPage fontSize={fontSize} />}
          {actualView === "create" && <CreateSongPage />}
        </div>
      </div>
    </div>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
