// @flow

import React, { useState, useContext } from 'react';
import Gutter from './gutter/Gutter';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';
import Line from './Line';
import Caret from './Caret';
import Selection from './Selection';

/**
 * Editor handling text input and displaying code text. Displays a code editor
 * with syntax highlighting and other code functionalities.
 * @see Gutter
 */
export default function TextEditor(props) {

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    /**
     * The selection state.
     * @see React
     */
    const [isSelecting, setIsSelecting] = useState(false)

     /**
     * The selection position state.
     * @see React
     */
    const [selection, setSelection] = useState({
        caret: { pos: { x: 0, y: 0 } },
        selection: {
            selRects: []
        }
    })

    /**
     * The text to display in this editor.
     */
    const text = props.text

    /**
     * The {@link LanguagePlugin} to parse this text by.
     */
    const plugin = props.plugin

    /**
     * on Text changed callback for the text area.
     */
    const onTextChange = props.onTextChange

    /**
     * A Reference to the text area html element.
     */
    const textArea = props.textAreaRef

    /**
     * The tokeniser library chopstring.js
     */
    const chopstring = Chopstring()

    /**
     * Generate an array of {@link Line} components with end of line state for
     * multi-line features.
     * @param {Array<String>} lines 
     */
    function generateLines(lines: Array<String>): Array<Line> {
        var endOfLineState = ""
        const lineList = lines.map((line, index, stringList) => {
            return <Line key={index.toString() + line}
                        line={line} 
                        plugin={plugin}/>
        })

        return lineList
    }

    /**
     * Handles the mouse down event on the text editor.
     * @param {React.SyntheticEvent} event 
     */
    function onMouseDown(event) {
        setIsSelecting(true)
        window.getSelection().removeAllRanges()
    }

    /**
     * Handles the mouse move event on the text editor.
     * @param {React.SyntheticEvent} event 
     */
    function onMouseMove(event) {
        if (isSelecting) {
            try {
                const sel = window.getSelection().getRangeAt(0)
                // grab the selection rectangles,
                const clientRects = sel.getClientRects()
                const rectList = Object.values(clientRects)
        
                // set state,
                setSelection({
                    caret: {
                        pos: { y: clientRects[0].y, x: clientRects[0].x } 
                    },
                    selection: {
                        selRects: rectList
                    }
                })
            } catch (exception) {
                setIsSelecting(false)
            }
        }
    }

    /**
     * Handles the mouse up event on the text editor.
     * @param {React.SyntheticEvent} event 
     */
    function onMouseUp(event) {
        try {
            const sel = window.getSelection().getRangeAt(0)
            console.log(sel)
            // grab the selection rectangle,
            const selRect = sel.getBoundingClientRect()
            const clientRects = sel.getClientRects()

            // figure out if the selection spans more than one line,
            var lineCount = selRect.height / sel.startContainer.parentElement.clientHeight
            // round since height differs slighlt sometimes?
            lineCount = Math.round(lineCount)
            
            // set state,
            setSelection({
                caret: {
                    pos: { y: clientRects[0].y, x: clientRects[0].x } 
                },
                selection: {
                    selRects: Object.values(clientRects)
                }
            })
            setIsSelecting(false)
            //textArea.current.focus()
        } catch (exception) {
            setIsSelecting(false)
            //textArea.current.focus()
        }
    }

    return (
        <div className="text-editor text-editor-theme" 
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            <div className="text-editor-overlays">
                <Selection selection={selection.selection.selRects}/>
                <Caret position={selection.caret.pos}/>
            </div>
            <span className="line-generator">
                { generateLines(chopstring.splitLines(text)) }
            </span>
        </div>
    )
}

TextEditor.defaultProps = {
    plugin: {},
    text: ''
}