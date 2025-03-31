import React from "react"

const chordRegex = /^\*\*/
const isChords = (line) => chordRegex.test(line)
const normalizarCifrado = (line) => {
    return line
        .replaceAll(/do/ig, "C")
        .replaceAll(/re/ig, "D")
        .replaceAll(/mi/ig, "E")
        .replaceAll(/fa/ig, "F")
        .replaceAll(/sol/ig, "G")
        .replaceAll(/la/ig, "A")
        .replaceAll(/si/ig, "B")
        .replaceAll(/aug/ig, "M")

}
const isAChord = (text) => {
    return /[A-G](7|m|m7|°|M|°7|M7)?/.test(text.replaceAll("(", "").replaceAll(")", "")) || (text[0] === "*" && text[1] === "*")
}
const isUnidentifiedChords = (line) => {
    let test = line.trim()
    let chords = test.split(/(\s+)/).filter(chrds => chrds.trim() !== "")
    if (chords.length === 0) return false
    else if (chords.length === 1) return isAChord(chords[0])
    else {
        let nonChordsCount = 0
        for (let i = 0; i < chords.length; i++) {
            if (!isAChord(chords[i])) {
                nonChordsCount++
            }
        }
        return nonChordsCount === 0
    }
}
const chordify = (line) => {
    // console.log("line   ", line)
    if (isChords(line)) {
        let newLine = line.replace("**", "")
        return newLine.split(/(\s+)/).map((segment, index) => {
            if (segment.trim() === "") return (
                <span key={index} className={`chord-space`} style={{ whiteSpace: "pre" }}>
                    {segment}
                </span>
            )
            else return (
                <span key={index} className={`chord ${segment.replace("(", "").replace(")", "") }`} style={{ color: "blue" }}>
                    {segment}
                </span>
            )
        })
    } else return line
}
export { chordify, isAChord, isUnidentifiedChords, normalizarCifrado }