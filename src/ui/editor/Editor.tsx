import * as React from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'
import Line from './Line'
import FileReader from '../../io/FileReader'
import * as Lexer from '../../lexer/Lexer'
import PluginReader from '../../lexer/PluginReader'
import Gutter from './gutter/Gutter'
import { SelectionManager } from './SelectionManager'

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
    const [lines, setLines] = useState<string[][]>([])

    /**
     * Memoizes the {@link Lexer} class use to parse the editor text.
     * Depends on the plugin to change.
     */
    const lexer = useMemo(() => new Lexer.Lexer(plugin ? plugin.id : ''), [plugin])

    /**
     * Memoizes the {@link SelectionManager}.
     */
    const selector = useMemo(() => new SelectionManager(), [])

    /**
     * Reference for the text area consuming the text editing.
     * @see 
     */
    const textarea = useRef(null)

    /**
     * Holds the text consuming the text editor temporarily.
     */
    const [text, setText] = useState('')

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

    /**
     * Handles the editor click.
     * @param event 
     */
    function onEditorClick(event: React.SyntheticEvent) {
        // get selection of the editor,
        const sel = selector.getSelection(document.getElementsByClassName('text-editor')[0] as HTMLElement)

        console.log('Selection is: ', sel);

        textarea.current.focus()
    }

    /**
     * Handles the text area on change event.
     * @param event 
     */
    function onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(event.currentTarget.value)
    }

    return (
        <div className="editor token">
            <Gutter lines={lines}/>
            <div className="text-editor"
                onClick={onEditorClick}>
                {
                    lines.map(line => <Line key={line[0]}
                        lexer={lexer}
                        value={line[1]} 
                        plugin={plugin}/>)
                }
            </div>
            <textarea className="text-edit"
                ref={textarea}
                value={text}
                onChange={onTextChange}/>
        </div>
    )
}