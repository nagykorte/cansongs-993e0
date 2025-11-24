import React from "react"
import { chordify } from "../utils/chordify"
import { isUnidentifiedChords, normalizarCifrado } from "../utils/chordify"

const CreateSongPage = () => {
    const [newLine, setNewLine] = React.useState("")
    const [lines, setLines] = React.useState([])
    const [draggedIndex, setDraggedIndex] = React.useState(null)

    const addLine = () => {
        console.log(newLine)
        if (newLine.trim()) {
            let nextLine = newLine
            if (isUnidentifiedChords(normalizarCifrado(nextLine))) nextLine = `**${normalizarCifrado(nextLine)}`
            setLines([...lines, nextLine])
            console.log(lines)
            setNewLine("")
        }
    }

    const handleDragStart = async (e, index) => {
        await setDraggedIndex(index)
        console.log(`draggedIndex: ${draggedIndex} - index: ${index}`)
    }

    const handleDrop = (e) => {
        const targetIndex = Array.from(document.getElementById("lines_list").childNodes).indexOf(e.target.parentNode)
        if (draggedIndex !== null && targetIndex !== -1) {
            const updatedLines = [...lines]
            const [removed] = updatedLines.splice(draggedIndex, 1)
            updatedLines.splice(targetIndex, 0, removed)
            setLines(updatedLines)
            setDraggedIndex(null)
        }
    }
    const _createSong = async (password) => {
        let song = {
            title: document.getElementById("title").value,
            artist: document.getElementById("artist").value,
            album: document.getElementById("album").value,
            year: document.getElementById("year").value,
            lines: lines,
            password
        }
        console.log(song)
        const isDuplicate = false
        if (isDuplicate) {
            alert("A song with the same title, artist, album, and year already exists.")
        } else {
            try {
                fetch('/.netlify/functions/create-song', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(song)
                }).then(response => response.json()).then(data => {
                    console.log('Success:', data);
                    console.log("Song created! Adding to database...")
                    alert("Song added successfully!")
                }).catch((error) => {
                    console.error('Error:', error);
                });
                // await createSong(song)
            } catch (error) {
                console.error("Error creating song:", error)
            }
        }
    }

    return (
        <div
            style={{
                padding: "2rem",
                backgroundColor: "#f4f4f4",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>Create a New Song</h1>
            <p>Welcome to the song creation page!</p>

            <form onSubmit={(e) => { e.preventDefault();
                    let pass = prompt("Enter admin password to create song:");
                    _createSong(pass)
                }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="title" style={{ display: "block", marginBottom: "0.5rem" }}>Title:</label>
                    <input type="text" id="title" name="title" style={{ width: "30%", padding: "0.5rem" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="artist" style={{ display: "block", marginBottom: "0.5rem" }}>Artist:</label>
                    <input type="text" id="artist" name="artist" style={{ width: "30%", padding: "0.5rem" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="album" style={{ display: "block", marginBottom: "0.5rem" }}>Album:</label>
                    <input type="text" id="album" name="album" style={{ width: "30%", padding: "0.5rem" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="year" style={{ display: "block", marginBottom: "0.5rem" }}>Year:</label>
                    <input type="text" id="year" name="year" style={{ width: "30%", padding: "0.5rem" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="lines" style={{ display: "block", marginBottom: "0.5rem" }}>Lines:</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input
                            type="textarea"
                            id="lines"
                            name="lines"
                            style={{ width: "30%", padding: "0.5rem" }}
                            value={newLine}
                            onPaste={(e) => {
                                const text = (e.originalEvent || e).clipboardData.getData('text/plain')
                                console.log(text)
                                const linesFromText = text.split(/\r?\n/).map(line => isUnidentifiedChords(normalizarCifrado(line)) ? `**${normalizarCifrado(line)}` : line)
                                setLines([...lines, ...linesFromText])
                                console.log(lines)
                                document.getElementById("lines").value = ""
                            }}
                            onChange={(e) =>{console.log(e.target.value); setNewLine(e.target.value)}}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    addLine()
                                }
                                 else if (e.ctrlKey && e.key === "v") {
                                    setTimeout(() => {
                                        document.getElementById("lines").value = ""
                                    }, 100)
                                }   
                            }}
                        />
                        <button
                            type="button"
                            style={{
                                padding: "0.5rem",
                                backgroundColor: "green",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                            onClick={addLine}
                        >
                            +
                        </button>
                    </div>
                    <ul
                        id="lines_list"
                        style={{
                            listStyleType: "none",
                            padding: 0,
                            marginTop: "1rem",
                            border: "1px solid #ccc",
                            minHeight: "50px",
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {lines.map((line, index) => (
                            <span id={`span_line_${index}`} style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }} key={index}>
                                <li
                                    id={`line_${index}`}
                                    style={{
                                        padding: "0.5rem",
                                        fontFamily: "monospace",
                                        marginBottom: "0.5rem",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc",
                                        cursor: "grab",
                                        width: "50%",
                                        whiteSpace: "pre",
                                    }}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                >
                                    {chordify(line)}
                                </li>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <input
                                        type="checkbox"
                                        id={`checkbox_${index}`}
                                        checked={line.startsWith("**")}
                                        onChange={(e) => {
                                            const updatedLines = [...lines]
                                            updatedLines[index] = e.target.checked ? `**${line}` : line.replace(/^(\*\*)/, "")
                                            setLines(updatedLines)
                                            setNewLine("")
                                        }}
                                    />
                                    <label htmlFor={`checkbox_${index}`} style={{ cursor: "pointer", backgroundColor: "blue", padding: "0.5rem", borderRadius: "50%" }} >
                                        {/* <span role="img" aria-label="musical note"> */}
                                            🎵
                                            {/* </span> */}
                                        {/* <span role="img" aria-label="question mark">❓</span> */}
                                    </label>
                                    <button
                                        style={{
                                            fontSize: "2rem",
                                            padding: "0 0.5rem",
                                            backgroundColor: "orange",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                        }}
                                        onClick={event => {
                                            event.preventDefault()
                                            const updatedLines = [...lines]
                                            updatedLines.splice(index + 1, 0, line)
                                            setLines(updatedLines)
                                            setTimeout(() => {
                                                document.getElementById("lines").value = ""
                                            }, 100)
                                        }}
                                    >
                                        +
                                        {/* ⎘ */}
                                    </button>
                                    <button
                                        style={{
                                            padding: "0.5rem",
                                            backgroundColor: "red",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                        }}
                                        onClick={e => {
                                            e.preventDefault()
                                            const updatedLines = lines.filter((_, i) => i !== index)
                                            setLines(updatedLines)
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </span>
                        ))}
                    </ul>
                </div>
                <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}>
                    Create song!
                </button>
            </form>
        </div>
    )
}

export default CreateSongPage
