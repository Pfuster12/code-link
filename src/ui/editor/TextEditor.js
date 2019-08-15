// @flow

import React, { useState, useMemo, useRef } from 'react';
import Selection from '../../objects/text-editor/Selection'
import LineGenerator from './LineGenerator';
import KeyCode from './KeyCode';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

/**
 * Editor handling text input and displaying code text. Displays a code editor
 * with syntax highlighting and other code functionalities.
 * @see Gutter
 */
export default function TextEditor(props) {

    /**
     * The {@link LanguagePlugin} to parse this text by.
     */
    const plugin = props.plugin

     /**
     * The chopstring library memoized.
     */
    const chopstring = useMemo(() => Chopstring())

    /**
     * Holds the text area element reference for selection purposes.
     * Initialize value to null.
     */
    const textareaRef = useRef(null)

    // always start by focusing on the text area,
    if (textareaRef.current) textareaRef.current.focus()

    /**
     * Store in state the keys that map to each line object.
     */
    const [lines, setLines] = useState(() => {
        // split the lines,
        const lines = chopstring.splitLines(props.text)
        // map to keys,
        return chopstring.mapLineKeys(lines)
    })

    /**
     * Handles the Key Down event in the text area.
     * @param {React.SyntheticEvent} event Key Up event
     */
    function onKeyDown(event: React.SyntheticEvent) {
        // match the key down code...
        switch (event.keyCode) {

            /*
             Key Z. 
            */
            case KeyCode.KEY_Z:
                break;

            /*
             Key Enter
            */
            case KeyCode.KEY_ENTER:
                setLines(prevLines => [[Math.random(), ' '], ...prevLines])
                // break case,
                break;

            /*
             Key Backspace.
            */
            case KeyCode.KEY_BACKSPACE:
                
                setLines(prevLines => {
                    const l = prevLines.slice()
                    l.shift()
                    return l
                })
                break;

            /*
             Key Space.
            */
            case KeyCode.KEY_SPACE:
                break;
                
            /*
                Any other alpha-numerical-symbol key, we just treat it as adding it to the text,
            */
            default:
                // use an alphanumeric symbol regex to listen to character we want only,
                // from start ^, for only this char set [a-z0-9], until end of line $, ignoring case (i flag),
                const isAlphaNumeric = /^[a-z0-9\(\)\{\}\[\]\:\;\'\'\=\+\-\_\*\&\^\%\$\"\"\!\`\@\<\>\\\|\/\~\,\.\?]$/i.test(event.key)
                break;
        }
    }

    /**
     * Handles a onclick event on the line generator component.
     * @param event
     */
    function handleLineGeneratorClick(event: React.SyntheticEvent) {
        // always focus on the text area,
        textareaRef.current.focus()
    }

    return (
        <div className="text-editor text-editor-theme">
            <div className="text-editor-overlays">
                
            </div>
            <div className="line-generator"
                onClick={handleLineGeneratorClick}>
                {
                    lines.map(([key, line], index) => {
                        return <Line key={key}
                                value={line}
                                plugin={plugin}/>
                    })
                }
            </div>
            {/* Text area to take in user input. */}
            <textarea className="text-input text-input-theme token"
                wrap="off"
                ref={textareaRef}
                // apply all the possible selection listeners,
                onKeyDown={onKeyDown}/>
        </div>
    )
}

TextEditor.defaultProps = {
    plugin: {},
    text: ''
}