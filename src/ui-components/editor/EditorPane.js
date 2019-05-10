import React, { useState, useContext } from 'react';
import Gutter from './Gutter';
import { ThemeContext } from '../../theme/theme-context'
import TextEditor from './TextEditor';

/**
 * Editor window handling text input and displaying code text. Displays a code editor
 * and a gutter to the left hand side for code editing functionality.
 * @see TextEditor
 * @see Gutter
 */
export default function EditorPane() {

    /**
     * The App-wide context reference.
     * @see ThemeContext
     * @see useContext
     */
    const [theme, setTheme] = useContext(ThemeContext)

    /**
     * Text area editText state object stores the current value and the
     * selection range of the text.
     * @see useState
     */
    const [editText, setEditText] = useState({
        value: "This is an editText.\nThis is a second line.\nAnd a third now.\n\n\nHey now.",
        selectionStart: 0,
        selectionEnd: 0
    })

    /**
     * Handles the text area change event setting it to state.
     * @param {React.SyntheticEvent} event JSX event.
     */
    function onChange(event) {
        setEditText({
            value: event.currentTarget.value
        })
    }

    return (
        <div className="editor">
            {/* Pass the text value to the gutter. */}
            <Gutter text={editText.value}/>
            <TextEditor editText={editText}
                onChange={onChange}/>
        </div>
    )
}