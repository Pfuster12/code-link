// @flow

import React, { useState, useContext } from 'react';
import Gutter from './gutter/Gutter';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

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
      * A Reference to the text area html element.
      */
     var textArea = React.createRef()

    /**
     * The {@link Line} array to display.
     */
    const lines = props.lines

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
                { lines }
            </div>
            <textarea className="text-input token"
                ref={ ref => textArea = ref}
                wrap="off"/>
        </div>
    )
}