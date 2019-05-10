import React, { useState, useContext } from 'react';
import Gutter from './Gutter';
import { ThemeContext } from '../../theme/theme-context'
import LineGenerator from './LineGenerator';

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
     * Text area Editor state object passed by parent {@link EditorPane} stores
     * the current value and the selection range of the text.
     */
    const editText = props.editText

    /**
     * Text area onChange callback from the parent {@link EditorPane} component
     * to change the state object.
     * Passed to this TextEditor's <textarea/> onChange callback.
     */
    const onChange = props.onChange

    /**
     * Parent container style holding the text area and the generated lines.
     */
    const containerStyle = {
        display: 'flex',
        flex: 1,
        cursor: 'text',
        backgroundColor: theme.backgroundColorEditor
    }

    /**
     * TextArea editor style
     */
    const textAreaStyle = {
        position: 'absolute',
        resize: 'none',
        borderStyle: 'none',
        borderColor: 'transparent',
        outline: 'none',
        border: 'none',
        width: '1px',
        height: '1px',
        padding: 0,
        lineHeight: theme.editorTextStyle.lineHeight,
        fontSize: theme.editorTextStyle.fontSize
    }

    function onClick(event) {
        textArea.focus()
    }

    return (
        <div style={containerStyle}
            onClick={onClick}>
            <LineGenerator text={editText.value}/>
            <textarea style={textAreaStyle}
                ref={ ref => textArea = ref}
                onChange={onChange}
                value={editText.value}
                wrap="off"/>
        </div>
    )
}