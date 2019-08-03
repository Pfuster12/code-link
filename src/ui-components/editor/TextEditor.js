// @flow

import React, { useState, useMemo } from 'react';
import Selection from '../../objects/text-editor/Selection'
import LineGenerator from './LineGenerator';
import KeyBindings from './KeyBindings';
import Chopstring from '../../lexer/chopstring';

/**
 * Editor handling text input and displaying code text. Displays a code editor
 * with syntax highlighting and other code functionalities.
 * @see Gutter
 */
export default function TextEditor(props) {
    
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
     * The chopstring library memoized.
     */
    const chopstring = useMemo(() => Chopstring())

    /**
     * Store in state the keys that map to each line object.
     */
    const [lines, setLines] = useState(() => {
        // split the lines,
        const lines = chopstring.splitLines(text)
        // map to keys,
        return chopstring.mapLineKeys(lines)
    })

    /**
     * Handles the Key Down event in the text area.
     * @param {React.SyntheticEvent} event Key Up event
     */
    function onKeyDownPress(event: React.SyntheticEvent) {
        // if the key press is Enter,
        if (event.keyCode == KeyBindings.KEY_ENTER) {
            console.log("Enter has been pressed...")

            // clone the array...
            // ATT Array.slice() create a shallow copy of the elements, ie they are the same reference.
            // Array.slice() is currently the fastest method to clone an array
            // @see stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
            const array = lines.slice()

            // push a new line in the index of the current selection,
            // TODO assign a uid as the key and add to real selection...
            array.splice(2, 0, [Math.random(), 'Test Line'])

            // set the state again,
            setLines(array)
        }
    }

    return (
        <div className="text-editor text-editor-theme">
            <div className="text-editor-overlays">
                
            </div>
            <LineGenerator plugin={plugin} 
                text={text}
                lines={lines}/>
            {/* Text area to take in user input. */}
            <textarea className="text-input text-input-theme token"
                wrap="off"
                value={text}
                onKeyDown={onKeyDownPress}
                onChange={onTextChange}/>
        </div>
    )
}

TextEditor.defaultProps = {
    plugin: {},
    text: ''
}