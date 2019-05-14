import React, { useState, useContext } from 'react';
import Gutter from './Gutter';
import { ThemeContext } from '../../theme/theme-context'
import TokenGenerator from './TokenGenerator';

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
    const textEditor = props.textEditor

    /**
     * Text area onChange callback from the parent {@link EditorPane} component
     * to change the state object.
     * Passed to this TextEditor's <textarea/> onChange callback.
     */
    const onChange = props.onChange

    /**
     * Parent container style holding the text area and the generated lines.
     */
    const textEditorStyle = {
        backgroundColor: theme.backgroundColorEditor
    }

    /**
     * TextArea editor style
     */
    const textAreaStyle = {
        lineHeight: theme.editorTextStyle.lineHeight,
        fontSize: theme.editorTextStyle.fontSize
    }

    /**
     * onClick text editor to focus on the text area always.
     * @param {React.SyntheticEvent} event 
     */
    function onClick(event) {
        textArea.focus()
    }

    return (
        <div className="text-editor" 
            style={textEditorStyle}
            onClick={onClick}>
            <TokenGenerator textEditor={textEditor}/>
            <textarea style={textAreaStyle}
                ref={ ref => textArea = ref}
                onChange={onChange}
                value={textEditor.value}
                wrap="off"/>
        </div>
    )
}