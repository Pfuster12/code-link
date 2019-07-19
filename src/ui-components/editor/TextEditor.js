// @flow

import React, { useState, useContext } from 'react';
import Selection from '../../objects/text-editor/Selection'
import LineGenerator from './LineGenerator';

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
                
            </div>
            <LineGenerator plugin={plugin} text={text}/>
            {/* Text area to take in user input. */}
            <textarea className="text-input text-input-theme token"
                wrap="off"
                value={text}
                onMouseUp={onMouseUp}
                onChange={onTextChange}/>
        </div>
    )
}

TextEditor.defaultProps = {
    plugin: {},
    text: ''
}