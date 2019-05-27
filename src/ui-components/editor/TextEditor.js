// @flow

import React, { useState, useContext } from 'react';
import Gutter from './gutter/Gutter';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';
import Line from './Line';
import Caret from './Caret';

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
    const [caret, setCaret] = useState({
        pos: {
            x: 0,
            y: 0
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
     * Handles a line selection change.
     */
    function onLineSelection(position) {
        setCaret({
            pos: position
        })
    }

    /**
     * Generate an array of {@link Line} components with end of line state for
     * multi-line features.
     * @param {Array<String>} lines 
     */
    function generateLines(lines: Array<String>): Array<Line> {
        var endOfLineState = ""
        const lineList = lines.map((line, index, stringList) => {
            return <Line key={line + index}
                        onSelect={onLineSelection}
                        line={line} 
                        plugin={textEditor.plugin}/>
        })

        return lineList
    }

    /**
     * onClick text editor to focus on the text area always.
     * @param {React.SyntheticEvent} event 
     */
    function onClick(event) {
        textArea.focus()
    }

    return (
        <div className="text-editor text-editor-theme" 
            onClick={onClick}>
            <div className="line-generator">
                { generateLines(textEditor.lines) }
            </div>
            <textarea className="text-input token"
                ref={ ref => textArea = ref}
                wrap="off"/>
            <Caret position={caret.pos}/>
        </div>
    )
}