import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Line from './Line'
import FileReader from '../../io/FileReader'
import * as Lexer from '../../lexer/Lexer'
import PluginReader from '../../lexer/PluginReader'
import Gutter from './gutter/Gutter'

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
     * Store the current {@link Lexer.Plugin} for this editor to provide down the component tree.
     */
    const [plugin, setPlugin] = useState<Lexer.Lexer.Plugin | null>(null)

    /**
     * Stores the line array this editor displays.
     */
    const [lines, setLines] = useState([['0', 'function test() {'], ['1', 'const x = 1']])

    /**
     * Memoizes the {@link Lexer} class use to parse the editor text.
     * Depends on the plugin to change.
     */
    const lexer = useMemo(() => new Lexer.Lexer(plugin ? plugin.id : ''), [plugin])

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
                console.log(`Error reading file ${props.file} in editor`);
            })
    },
    [props.file])

    /**
     * Load the default language plugin into this editor.
     */
    useEffect(() => {
        // read the plugin using the reader library,
        PluginReader()
            .readPlugin('./src/lexer/plugins/javascript-plugin.json')
            .then(res => {
                console.log('Plugin read ', res);
                
                // update the state,
                setPlugin(res)
            })
            .catch(err => {
                console.log(`Error reading plugin in editor`, err);
            })
    },
    [])

    return (
        <div className="editor token">
            <Gutter/>
            <div className="text-editor">
                {
                    lines.map(line => <Line key={line[0]}
                        lexer={lexer}
                        value={line[1]} 
                        plugin={plugin}/>)
                }
            </div>
        </div>
    )
}