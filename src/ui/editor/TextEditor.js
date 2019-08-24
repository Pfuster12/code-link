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
        // get the selection indices,
        const sel = getSelection()

        console.log(sel);

        // set the editor selection,
        setSelection(sel)

        textareaRef.current.focus()
    }
    
    /**
     * Get the selection indices of the current document selection in the
     * this {@link TextEditor} using the document selection API.
     * 
     * @returns A Selection indices object.
     */
    function getSelection(): Selection {
        // get the line generator element,
        const editor = document.getElementsByClassName('line-generator')[0]

        // grab the document selection object, we know it will only be contained
        const sel = document.getSelection()

        // get the range object of the selection,
        const range = sel.getRangeAt(0)

        // get the text selection indices,
        const offset = getSelectionTextOffset(editor, range)

        // get the selection range line numbers,
        const lineNumbers = getSelectionLineNumber(range)

        // get the line offset index,
        const lineOffsets = getLineOffsets(editor.textContent, offset.start, offset.end)

        return new Selection(
            { 
                offset: offset.start, 
                line: lineNumbers.start,
                lineOffset: lineOffsets.start
            },
            {
                offset: offset.start, 
                line: lineNumbers.end,
                lineOffset: lineOffsets.end
            }
        )
    }

    /**
     * Gets the line numbers of the current text selection range. A range can span
     * multiple lines, and can start in both directions, i.e. start high to low.
     * @param {Range} range The range object of the current selection.
     * 
     * @returns Line numbers object for start and end selection range.
     */
    function getSelectionLineNumber(range: Range): Object {
        // find the line number of the current start selection by dividing by the
        // lineheight and round the division to find the whole number, the line
        // is added 1 to find the 1 based line,
        const startLine = Math.round((range.getBoundingClientRect().top / 19))

        // find the line number of the current start selection,
        const endLine = Math.round((range.getBoundingClientRect().bottom / 19)) - 1

        return { 
            start: startLine,
            end: endLine 
        }
    }

    /**
     * Gets the offsets from the start of the line.
     * @param {string} text Text content to get the line offset.
     * @param {number} startIndex Start index of the text.
     * @param {number} endIndex End index of the text.
     */
    function getLineOffsets(text: string, startIndex: number, endIndex: number): Object {
        // extract the first chunk of the text,
        const firstChunk = text.slice(0, startIndex)

        // extract the second chunk of the text,
        const secondChunk = text.slice(endIndex, text.length)

        // find the offset of the first line selection by getting the index
        // of the new line character starting from the end of the offset,
        const startOffset = startIndex - firstChunk.lastIndexOf('\n')

        // repeat for the end offset of the line,
        const endOffset = secondChunk.indexOf('\n')

        return {
            start: startOffset,
            end: endOffset
        }
    }

    /**
     * Get the offset from the beginning of the line-generator node of the given node, plus
     * any extra offset given by the parameter 'offset'.
     * @param {Node} node Document node to get the offset from the beginning of the node container.
     * @param {number} offset Offset of text from the given node the selection reaches.
     */
    function getSelectionTextOffset(editor: Element, range: Range) {
        // init a start range
        const startrange = new Range()

        // set the start to the beginning,
        startrange.setStart(editor, 0)

        // set the end to the start container to find the start index from the text,
        startrange.setEnd(range.startContainer, range.startOffset)

        // get the index by finding the length of the string,
        const startIndex = startrange.toString().length

        // init an end range,
        const endrange = new Range()

        // set the start to the beginning,
        endrange.setStart(editor, 0)

        // set the end to the end container to find the end index fom the text,
        endrange.setEnd(range.endContainer, range.endOffset)

        // get the index by finding the length of the string,
        const endIndex = endrange.toString().length

        return { 
            start: startIndex,
            end: endIndex 
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