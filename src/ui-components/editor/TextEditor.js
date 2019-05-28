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
     * The caret position state.
     * @see React
     */
    const [selection, setSelection] = useState({
        caret: {
            pos: {
                x: 0,
                y: 0
            }
        },
        selection: {
            lines: 1,
            selPos: {
                x: 0,
                y: 0,
                width: 0
            }
        }
    })

     /**
      * A Reference to the text area html element.
      */
     var textArea = React.createRef()

    /**
     * The {@link Line} array to display.
     */
    const textEditor = props.textEditor

    /**
     * Generate an array of {@link Line} components with end of line state for
     * multi-line features.
     * @param {Array<String>} lines 
     */
    function generateLines(lines: Array<String>): Array<Line> {
        var endOfLineState = ""
        const lineList = lines.map((line, index, stringList) => {
            return <Line key={line + index}
                        line={line} 
                        plugin={textEditor.plugin}/>
        })

        return lineList
    }

    /**
     * Handles the mouse up event on the Line component.
     * @param {React.SyntheticEvent} event 
     */
    function onMouseUp(event) {
        const sel = window.getSelection().getRangeAt(0)
        console.log(sel);
        // grab the selection rectangle,
        const selRect = sel.getBoundingClientRect()
        console.log(selRect)
        const clientRects = sel.getClientRects()
        console.log(sel.getClientRects())

        // figure out if the selection spans more than one line,
        const lines = selRect.height / sel.startContainer.parentElement.clientHeight
        console.log(lines)
        // grab the last rect in the client rects array to find the x pos of the end of selection,
        const lastRect = clientRects[clientRects.length - 1]
        const lastLineEnd = lastRect.left + lastRect.width

        // calculate the selection highlight position and dimension,
        const selPos = {
            // the x position is the start containers offset left from the parent container,
            x: selRect.left,
            // the y position is the start containers offset top from the parent container,
            y: selRect.top,
            // to find the width we find the difference between the end span start position 
            // and the start span start position, plus the width of the end span
            width: selRect.width
        }

        // set state,
        setSelection({
            caret: {
                pos: {
                    y: selRect.y,
                    x: selRect.x
                }
            },
            selection: {
                lines: Math.round(lines),
                selPos: selPos,
            }
        })
    }

    /**
     * onClick text editor to focus on the text area always.
     * @param {React.SyntheticEvent} event 
     */
    function onClick(event) {
        //textArea.focus()
    }

    return (
        <div className="text-editor text-editor-theme" 
            onClick={onClick}
            onMouseUp={onMouseUp}>
            <Selection selection={selection.selection}/>
            <div className="line-generator">
                { generateLines(textEditor.lines) }
            </div>
            <textarea className="text-input token"
                ref={ ref => textArea = ref}
                wrap="off"/>
            <Caret position={selection.caret.pos}/>
        </div>
    )
}