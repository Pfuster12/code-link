import * as React from 'react'
import { useState, useEffect } from 'react'
import Line from './Line'
import FileReader from '../../io/FileReader'
import * as lexer from '../../lexer/Lexer'

interface EditorProps {
    file: string
}

/**
 * The code editor component handling syntax highlighting and text editing.
 * @property props
 */
export default function Editor(props: EditorProps) {

    /**
     * Store the file passed to this Editor to open.
     */
    const file = props.file

    /**
     * Read editor file effect.
     */
    useEffect(() => {
        FileReader()
            .readFile(file)
            .then(res => {
                // split lines,
                const splitLines = lexer.split(res)

                // map to unique keys,
                const map = splitLines.map(line => [Math.random().toString(), line])

                // set state,
                setLines(map)
            })
            .catch(err => {

            })
    },
    [])

    /**
     * Stores the line array this editor displays.
     */
    const [lines, setLines] = useState([['0', 'function show() {'], ['1', 'const lol = 1']])

    return (
        <div className="editor token">
            {
                lines.map(line => <Line key={line[0]} value={line[1]}/>)
            }
        </div>
    )
}