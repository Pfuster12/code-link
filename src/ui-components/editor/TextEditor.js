// @flow

import React, { useState, useContext } from 'react';
import Gutter from './gutter/Gutter';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';
import Caret from './Caret';
import Selection from '../../objects/text-editor/Selection'
import LineGenerator from './LineGenerator';

/**
 * Editor handling text input and displaying code text. Displays a code editor
 * with syntax highlighting and other code functionalities.
 * @see Gutter
 */
export default function TextEditor(props) {

    /**
     * The selection state.
     * @see React
     */
    const [isSelecting, setIsSelecting] = useState(false)

    /**
     * Stores the current {@link Selection} of this {@link EditorPane}
     */
    const [selection, setSelection] = useState(new Selection(0, 0, new Caret(0, 0)))
    
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
    var textArea = React.createRef()

    /**
     * Handles the mouse up event on the text editor.
     * @param {React.SyntheticEvent} event 
     */
    function onMouseUp(event) {
        try {
            const caret = new Caret(0, 0)
            // set the selection state object,
            setSelection(new Selection(textArea.current.selectionStart, textArea.current.selectionEnd, caret))
        } catch (exception) {
            // do nothing...
        }
    }

    return (
        <div className="text-editor text-editor-theme">
            <div className="text-editor-overlays">
                {/*<Caret position={selection.caret}/>*/}
            </div>
            <LineGenerator plugin={plugin} text={text}/>
            {/* Text area to take in user input. */}
            <textarea className="text-input text-input-theme token"
                wrap="off"
                value={text}
                onMouseUp={onMouseUp}
                onChange={onTextChange}
                ref={textArea}/>
        </div>
    )
}

TextEditor.defaultProps = {
    plugin: {},
    text: ''
}