// @flow

import React, { useState, useMemo, useRef } from 'react';
import Selection from '../../objects/text-editor/Selection'
import LineGenerator from './LineGenerator';
import KeyCode from './KeyCode';
import Chopstring from '../../lexer/chopstring';

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
     * The editor state of this {@link TextEditor}. It holds a value property
     * with the text and a selection object for the textarea selection's start and end indices.
     */
    const [editor, setEditor] = useState(() => ({
        value: props.text,
        selection: {
            start: 0,
            end: 0
        }
    }))

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
        const lines = chopstring.splitLines(editor.value)
        // map to keys,
        return chopstring.mapLineKeys(lines)
    })

    /**
     * Handles the text area value change from the text editor.
     * @param {React.SyntheticEvent} event 
     */
    function onTextChange(event: React.SyntheticEvent) {
        // set the text editor state,
        setEditor({
            value: event.currentTarget.value,
            selection: getSelection(textareaRef)
        })
    }

    /**
     * Handles the Key Down event in the text area.
     * @param {React.SyntheticEvent} event Key Up event
     */
    function onKeyDown(event: React.SyntheticEvent) {
        // clone the array...
        // ATT Array.slice() create a shallow copy of the elements, ie they are the same reference.
        // Array.slice() is currently the fastest method to clone an array
        // @see stackoverflow.com/questions/3978492/fastest-way-to-duplicate-an-array-in-javascript-slice-vs-for-loop
        const array = lines.slice()
        
        // find the selection in the context of lines from the context of the whole text,
        const selection = findLineSelection()

        // if the key press is Enter,
        switch (event.keyCode) {
            case KeyCode.KEY_Z:
                if (event.ctrlKey) {
                    // split the lines,
                    const lines = chopstring.splitLines(editor.value)
                    // map to keys,
                    setLines(chopstring.mapLineKeys(lines))
                }
                break;
            case KeyCode.KEY_ENTER:
                console.log("Enter has been pressed...")

                 // get the first chunk with one less index,
                 const a1 = array[selection.start.line][1].substring(0, selection.start.index)
                 console.log('1st Half cut at ' + selection.start.index + ': ' + a1)

                 const a2 = array[selection.end.line][1].substring(selection.end.index)
                 console.log('2nd Half cut at ' + selection.end.index + ': ' + a2)

                 // substring concat the new new line with the first chunk only,
                 array[selection.start.line][1] = a1 + '\n'

                  // push a new line in the index of the current selection,
                // TODO assign a uid as the key and add to real selection...
                array.splice(selection.start.line + 1, 0, [Math.random(), a2])
                // break case,
                break;
            case KeyCode.KEY_BACKSPACE:
                // get the first chunk with one less index,
                 const f1 = array[selection.start.line][1].substring(0, selection.start.index - 1)
                 console.log('1st Half cut at ' + selection.start.index + ': ' + f1)

                 const f2 = array[selection.end.line][1].substring(selection.end.index)
                 console.log('2nd Half cut at ' + selection.end.index + ': ' + f2)

                 // substring concat the new symbol into the array,
                 array[selection.start.line][1] = f1 + f2
                break;

            case KeyCode.KEY_SPACE:
                // get the first chunk with one less index,
                const firstChunk = array[selection.start.line][1].substring(0, selection.start.index)
                console.log('1st Half cut at ' + selection.start.index + ': ' + firstChunk)

                const secondChunk = array[selection.end.line][1].substring(selection.end.index)
                console.log('2nd Half cut at ' + selection.end.index + ': ' + secondChunk)

                // substring concat the new symbol into the array,
                array[selection.start.line][1] = firstChunk + ' ' + secondChunk
                break;
            /*
                Any other alpha-numerical-symbol key, we just treat it as adding it to the text,
            */
            default:
                // use an alphanumeric symbol regex to listen to character we want only,
                // from start ^, for only this char set [a-z0-9], until end of line $, ignoring case (i flag),
                const isAlphaNumeric = /^[a-z0-9\(\)\{\}\[\]\:\;\'\'\=\+\-\_\*\&\^\%\$\"\"\!\`\@\<\>\\\|\/\~\,\.\?]$/i.test(event.key)

                // only if alphanumeric,
                if (isAlphaNumeric) {                    
                    const firstChunk = array[selection.start.line][1].substring(0, selection.start.index)
                    console.log('1st Half cut at ' + selection.start.index + ': ' + firstChunk)

                    const secondChunk = array[selection.end.line][1].substring(selection.end.index)
                    console.log('2nd Half cut at ' + selection.end.index + ': ' + secondChunk)

                    // substring concat the new symbol into the array,
                    array[selection.start.line][1] = firstChunk + event.key + secondChunk
                }
                break;
        }

        // set the state again with the clone array,
        setLines(array)
    }

    /**
     * Find the possible multi-line selection object of the text area.
     */
    function findLineSelection(): Object {
        console.log(document.getSelection())

        // create the selection object,
        return {
            start: {
                line: 0,
                index: 0,
            },
            end: {
                line: 0,
                index: 0,
            }
        }
    }

    /**
     * Handles the text area on key up event.
     * @param {React.SyntheticEvent} event 
     */
    function onKeyUp(event: React.SyntheticEvent) {
        // set the text editor state,
        setEditor(prevEditor => ({
            // set the previous value,
            value: prevEditor.value,
            // get the current selection from the ref,
            selection: getSelection(textareaRef)
        }))
    }

    /**
     * Handles the text area on click event.
     * @param {React.SyntheticEvent} event 
     */
    function onClick(event: React.SyntheticEvent) {
        // set the text editor state,
        setEditor(prevEditor => ({
            // set the previous value,
            value: prevEditor.value,
            // get the current selection from the ref,
            selection: getSelection(textareaRef)
        }))
    }

    /**
     * Handles the text area on select event.
     * @param {React.SyntheticEvent} event 
     */
    function onSelect(event: React.SyntheticEvent) {
        // set the text editor state,
        setEditor(prevEditor => ({
            // set the previous value,
            value: prevEditor.value,
            // get the current selection from the ref,
            selection: getSelection(textareaRef)
        }))
    }

    /**
     * Gets the selection indices from the supplied textarea reference.
     * @param {React.Ref} ref The textarea reference.
     * 
     * @returns A selection object.
     */
    function getSelection(ref: React.Ref): Object {
        // return the refs selection indices,
        return {
            start: ref.current.selectionStart,
            end: ref.current.selectionEnd
        }
    }

    return (
        <div className="text-editor text-editor-theme">
            <div className="text-editor-overlays">
                
            </div>
            <LineGenerator plugin={plugin} 
                text={editor.value}
                lines={lines}/>
            {/* Text area to take in user input. */}
            <textarea className="text-input text-input-theme token"
                wrap="off"
                value={editor.value}
                ref={textareaRef}
                // apply all the possible selection listeners,
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onClick={onClick}
                onSelect={onSelect}
                onChange={onTextChange}/>
        </div>
    )
}

TextEditor.defaultProps = {
    plugin: {},
    text: ''
}