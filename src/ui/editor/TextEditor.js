// @flow

import React, { useState, useMemo, useRef, useEffect } from 'react';
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
    const [selection, setSelection] = useState(new Selection(0, 0))

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
                    const map = [[Math.random(), ' '], ...prevLines]
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
                    const l = prevLines.slice()
                    l.shift()
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
                break;
        }
    }

    /**
     * Handles a onclick event on the line generator component.
     * @param event
     */
    function handleLineGeneratorClick(event: React.SyntheticEvent) {
        // get the selection object,
        const sel = getSelectionOffsets()

        // focus on the text area ref to consume keyboard events,
        textareaRef.current.focus()

        // set the selection of the text editor,
        setSelection(sel)
    }
    
    /**
     * Helper function to get the selection indices of the currently selection in the
     * this {@link TextEditor} using the document selection API.
     * 
     * @returns Selection indices object.
     */
    function getSelectionOffsets(): Selection {
        // init a selection and a range,
        var sel, range;

        // init start and end indices to 0,
        var start = 0, end = 0;

        // with a valid selection,
        if (window.getSelection) {
            // get the selection,
            sel = window.getSelection()

            // if the range count is valid,
            if (sel.rangeCount) {
                // get the first range,
                range = sel.getRangeAt(sel.rangeCount - 1)

                // get the text offset of the start node,
                start = getBodyTextOffset(range.startContainer, range.startOffset)

                // get the text offset of the end node,
                end = getBodyTextOffset(range.endContainer, range.endOffset)

                // remove the existing ranges,
                sel.removeAllRanges()

                // add the new range to the range,
                sel.addRange(range)
            }
        }

        // return a new selection object with the calculated indices,
        return new Selection(start, end)
    }

    /**
     * Get the offset from the beginning of the line-generator node of the given node, plus
     * any extra offset given by the parameter 'offset'.
     * @param {Node} node Document node to get the offset from the beginning of the node container.
     * @param {number} offset Offset of text from the given node the selection reaches.
     */
    function getBodyTextOffset(node: Node, offset: number): number {
        // get the window selection,
        var sel = window.getSelection();

        // create a new range,
        var range = document.createRange();

        // select all the node contents of the line-generator...
        range.selectNodeContents(document.getElementsByClassName('line-generator')[0]);

        // knowing the start of the range is at the beginning set the end of the range to
        // the given node plus the offset from that node.
        range.setEnd(node, offset);

        // remove selection ranges,
        sel.removeAllRanges()

        // add the created one,
        sel.addRange(range);

        // return the range length to find the index of this node selection.
        return sel.toString().length;
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