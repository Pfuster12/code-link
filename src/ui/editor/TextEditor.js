// @flow

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Selection from '../../objects/text-editor/Selection'
import LineGenerator from './LineGenerator';
import KeyCode from './KeyCode';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';
import SelectionManager from './SelectionManager';

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
     * The text read from file for this editor to render on first layout.
     */
    const text = props.text

    /**
     * Callback to the {@link EditorPane} for any changes on the lines of this text editor.
     */
    const editorListener = props.editorListener

     /**
     * The chopstring library memoized.
     */
    const chopstring = useMemo(() => Chopstring())

    /**
     * Selection Manager for this text editor.
     */
    const selectionManager = useMemo(() => SelectionManager())

    /**
     * Holds the text area element reference for selection purposes.
     * Initialize value to null.
     */
    const textareaRef = useRef(null)

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
     * Store this {@link TextEditor}'s {@link Selection} in state.
     * Default to an initial selection.
     */
    const [selection, setSelection] = useState(new Selection({
        start: { 
            offset: 0, 
            line: 0,
            lineOffset: 0
        },
        end: {
            offset: 0, 
            line: 0,
            lineOffset: 0
        }
    }))

    /**
     * Effect to update the lines array on a text prop change.
     */
    useEffect(() => {
         // split the lines,
         const lines = chopstring.splitLines(props.text)

         // map the lines to keys,
         const map = chopstring.mapLineKeys(lines)

         editorListener(map.length)

         // set the state,
         setLines(map)
    },
    // run on text change,
    [text])

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
                setLines(prevLines => {
                    // slice the array from the selection,
                    const firstChunk = prevLines.slice(0, selection.start.line)
                    const lastChunk = prevLines.slice(selection.end.line, prevLines.length)
                    // add a new item with the spread operator,
                    const map = [...firstChunk, [Math.random(), ' '], ...lastChunk]

                    // callback to the editor,
                    editorListener(map.length)

                    return map
                })
                // break case,
                break;

            /*
             Key Backspace.
            */
            case KeyCode.KEY_BACKSPACE:
                
                setLines(prevLines => {
                    // clone the array,
                    const l = prevLines.slice()

                    // shift the first item,
                    l.shift()

                    // callback to the editor,
                    editorListener(l.length)
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

                if (isAlphaNumeric) {
                    setLines(prevLines => {
                        // clone,
                        const l = prevLines.slice()

                        return l
                    })
                }
                break;
        }
    }

    /**
     * Handles the onclick event on the line generator component.
     * @param event
     */
    function handleEditorClick(event: React.SyntheticEvent) {
        // get the line generator element,
        const editor = document.getElementsByClassName('line-generator')[0]
   
        // save the range of the user selection,
        const range = selectionManager.saveSelection()

        // get the selection indices,
        const sel = selectionManager.getSelection(editor)

        console.log(sel);

        // set the editor selection,
        setSelection(sel)

        // focus on the text area to consume key events,
        textareaRef.current.focus()

        if (range && window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    return (
        <div className="text-editor text-editor-theme">
            <div className="text-editor-overlays">
                
            </div>
            <div className="line-generator"
                onClick={handleEditorClick}>
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