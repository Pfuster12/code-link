// @flow

import React, { useState, useMemo, useRef, useEffect, useCallback } from './react';
import { Selection, SelOffset, CaretPos } from '../../objects/text-editor/Selection'
import KeyCode from './KeyCode';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';
import SelectionManager from './SelectionManager';
import Caret from './Caret';

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
     * The {@link Chopstring} library memoized.
     */
    const chopstring = useMemo(() => Chopstring())

    /**
     * {@link SelectionManager} for this text editor memoized.
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
    const [selection, setSelection] = useState(
        new Selection(new SelOffset(),
            new SelOffset(),
            new CaretPos(0, 0)))

    /**
     * Effect to update the lines array on a text prop change.
     */
    useEffect(() => {
         // split the lines,
         const lines = chopstring.splitLines(props.text)

         // map the lines to keys,
         const map = chopstring.mapLineKeys(lines)

         // set the lines state,
         setLines(map)
    },
    // run on text change,
    [text])

    /**
     * Memoize the editor listener for the lines length callback.
     */
    useCallback(editorListener(lines.length), [lines.length])

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
                // if selection is collapsed perform a simple slice of the array,
                if (selection.isCollapsed()) {
                    // set the new line map array state,
                    setLines(prevLines => {
                        // get the selected line,
                        const enterLine = prevLines[selection.start.line][1]
    
                        // slice the line in the given line offset,
                        // first chunk...
                        const firstChunk = enterLine.slice(0, selection.start.lineOffset)
    
                        // second chunk...
                        const secondChunk = enterLine.slice(selection.start.lineOffset, enterLine.length)
    
                        // slice the array from the selection,
                        const firstSlice = prevLines.slice(0, selection.start.line)
    
                        // slice other half,
                        const lastSlice = prevLines.slice(selection.end.line, prevLines.length)
    
                        // spread the new line in between slices...
                        // if the sliced chunk is empty then add a newline character only...
                        const map = [...firstSlice, [Math.random(), firstChunk.length > 0 ? firstChunk : '\n'], ...lastSlice]
    
                        // set the start line to the first chunk sliced,
                        map[selection.start.line + 1][1] = secondChunk
    
                        return map
                    })

                    // set the selection to be at the start offset of the new line added,
                    setSelection(new Selection(
                        new SelOffset(selection.start.offset - selection.start.lineOffset,
                            selection.start.line + 1, 
                            0),
                        new SelOffset(selection.start.offset - selection.start.lineOffset,
                            selection.start.line + 1, 
                            0),
                            selection.caret))
               // else we need to perform a deletion of the selected lines/text of the multiple spans,
               } else {
                   
               }
                // break case,
                break;

            /*
             Key Backspace.
            */
            case KeyCode.KEY_BACKSPACE:
                
                setLines(prevLines => {
                    if (prevLines.length > 1) {
                        // clone the array,
                        const l = prevLines.slice()

                        // shift the first item,
                        l.shift()

                        return l
                    } else {
                        return prevLines
                    }
                })
                break;

            /*
             Key Space.
            */
            case KeyCode.KEY_SPACE:
                break;

            case KeyCode.KEY_ESCAPE:
                window.getSelection().removeAllRanges()
                break;
                
            /*
                Any other alpha-numerical-symbol key, we just treat it as adding it to the text,
            */
            default:
                // use an alphanumeric symbol regex to listen to character we want only,
                // from start ^, for only this char set [a-z0-9], until end of line $, ignoring case (i flag),
                const isAlphaNumeric = /^[a-z0-9\(\)\{\}\[\]\:\;\'\'\=\+\-\_\*\&\^\%\$\"\"\!\`\@\<\>\\\|\/\~\,\.\?]$/i.test(event.key)

                if (isAlphaNumeric) {
                   
                }
                break;
        }
    }

    /**
     * Handles the onclick event on the line generator component.
     * @param {React.SyntheticEvent} event
     */
    function handleEditorClick(event: React.SyntheticEvent) {
        // get the line generator element,
        const editor = document.getElementsByClassName('line-generator')[0]

        // get the selection indices,
        var sel = selectionManager.getSelection(editor)

        // store temporarily the range of the user selection,
        const range = selectionManager.saveSelection()

        // set the editor selection,
        setSelection(sel)

        console.log(sel);
        
        // focus on the text area to consume key events,
        //textareaRef.current.focus()

        // if range and selection is valid,
        // if (range && window.getSelection) {
        //     // add the range back after losing it by focusing on the text area,
        //     sel = window.getSelection()

        //     // remove all new ranges,
        //     sel.removeAllRanges()

        //     // add the stored range back,
        //     sel.addRange(range)
        // }
    }

    function onMouseDown(event) {
        setSelection(prevSelection => {
            var caret;
            
            if (window.getSelection().rangeCount > 0) {
                caret = selectionManager.getCaretPosition(window.getSelection().getRangeAt(0))
            }

            return new Selection(prevSelection.start, prevSelection.end, caret ? caret : prevSelection.caret)
        })
    }

    return (
        <div className="text-editor text-editor-theme">
            <div className="text-editor-overlays">
                
            </div>
            <Caret position={selection.caret}/>
            {/* Map the line map-array to Line components */}
            <div className="line-generator"
                onClick={handleEditorClick}
                onMouseDown={onMouseDown}>
                {
                    lines.map(([key, line]) => {
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