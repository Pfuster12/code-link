import * as React from 'react'
import { useState, useEffect } from 'react'
import Line from './Line'
import FileReader from '../../io/FileReader'
import * as lexer from '../../lexer/Lexer'
import PluginReader from '../../lexer/PluginReader'

interface EditorProps {
    file: string
}

/**
 * The code editor component handling syntax highlighting and text editing.
 * The editor is responsible for its file, handling io operations and 
 * language plugin selection.
 * @property props
 */
export default function Editor(props: EditorProps) {

    /**
     * Store the current plugin for this editor to provide down the component tree.
     */
    const [plugin, setPlugin] = useState(null)

    /**
     * Stores the line array this editor displays.
     */
    const [lines, setLines] = useState([['0', 'function test() {'], ['1', 'const x = 1']])

    /**
     * Read editor file effect.
     */
    useEffect(() => {
        // read the given file using the FileReader library,
        FileReader()
            .readFile(props.file)
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
     * Load the default language plugin into this editor.
     */
    useEffect(() => {
        PluginReader()
            .readPlugin('./src/io/lexer/plugins/javascript-plugin.json')
            .then(res => {
                console.log('Plugin read ', res);
                
                // update the state,
                setPlugin(res)
            })
            .catch(err => {

            })
    },
    [])

    return (
        <div className="editor token">
            {
                lines.map(line => <Line key={line[0]}
                     value={line[1]} 
                     plugin={plugin}/>)
            }
        </div>
    )
}