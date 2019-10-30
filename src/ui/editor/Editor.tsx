import * as React from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'
import Line from './Line'
import FileReader from '../../io/FileReader'
import * as Lexer from '../../lexer/Lexer'
import PluginReader from '../../lexer/PluginReader'
import Gutter from './gutter/Gutter'
import { SelectionManager, SelectionLineOffset } from './SelectionManager'
import KeyHandler from './KeyHandler'

interface EditorProps {

    /**
     * File path name the editor opens.
     */
    file: string
}

/**
 * The code editor component handling syntax highlighting and text editing.
 * The editor is responsible for its file, handling io operations and 
 * language plugin selection.
 * @description
 * The editor works by mapping an array of strings aka 'lines', vertically to visualize the
 * text content of the given file.
 * 
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
     * Stores the selection offset of this editor.
     */
    const [selection, setSelection] = useState<SelectionLineOffset>({
        start: 0,
        end: 0
    })

    /**
     * Memoizes the {@link Lexer} class use to parse the editor text.
     * Depends on the plugin to change.
     */
    const lexer = useMemo(() => new Lexer.Lexer(plugin ? plugin.id : ''), [plugin])

    /**
     * Memoizes the {@link SelectionManager}.
     */
    const selector = useMemo(() => new SelectionManager(), /* no deps */ [])

    /**
     * Reference for the text area consuming the text editing.
     * @see 
     */
    const textarea = useRef(null)

    /**
     * Read editor file effect.
     */
    useEffect(() => {
        // read the given file using the FileReader library,
        FileReader()
            .readFile(props.file)
            .then(res => {
                // split lines,
                const splitLines = lexer.splitNewLine(res)

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
     * Handles the text area on change event.
     * @param event 
     */
    function onKeyDown(event: React.KeyboardEvent) {
        KeyHandler(event, setLines, selection)
        textarea.current.value = ""
    }

    /**
     * Handle the editor mouse up event.
     * @param event 
     */
    function onEditorMouseUp(event: React.SyntheticEvent) {
        const overlay = document.querySelector('.text-editor') as HTMLDivElement
        const caret = document.querySelector('.caret') as HTMLDivElement

        if (document.getSelection) {
            const range = document.getSelection().getRangeAt(0)
            const rect = range.getBoundingClientRect()
            const firstRect = range.getClientRects()[0]
    
            console.log(overlay.getBoundingClientRect());
    
            caret.style.top = rect.top - 2 + 'px'
            caret.style.left = (firstRect.left - overlay.getBoundingClientRect().left) + 'px'
    
            console.log('Range: ',range, 'Rect: ', rect);
        }
    }

    return (
        <div className="editor token">
            <Gutter lines={lines}/>
            <div className="text-editor"
                onMouseUp={onEditorMouseUp}>
                <div className="text-editor-lines">
                    {
                        lines.map(line => <Line key={line[0]}
                            lexer={lexer}
                            value={line[1]} 
                            plugin={plugin}/>)
                    }
                </div>
                <div className="text-editor-overlays">
                    <div className="caret caret-theme"/>
                </div>
            </div>
            <textarea className="text-edit"
                ref={textarea}
                onKeyDown={onKeyDown}/>
        </div>
    )
}