import React, { useState, useContext, useEffect } from 'react';
import Gutter from './gutter/Gutter';
import TextEditor from './TextEditor';
import PluginReader from '../../lexer/PluginReader';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

/**
 * Editor window handling text input and displaying code text. Displays a code editor
 * and a gutter to the left hand side for code editing functionality.
 * @see TextEditor
 * @see Gutter
 */
export default function EditorPane() {

    /**
     * Stores the current value of this file's text.
     */
    const [text, setText] = useState('')

    /**
     * Stores the current language plugin to parse this Editor's text.
     */
    const [plugin, setPlugin] = useState({})

    /**
     * Effect to read the current selected language plugin to parse the text.
     */
    useEffect(() => {
        console.log('%c Starting up the Editor Pane. Reading plugin...', 'color: royalblue;')
        
        // plugin reader to parse the language plugin.
        const pluginReader = PluginReader()

        // read the js plugin,
        pluginReader.readPlugin('./src/lexer/language-plugins/javascript-plugin.json')
            .then(result => {
                console.log(result)
                // set the text editor state,
                setPlugin(result)
                setText('// A comment "has been" made\n\n/*\n * This is a JSDOC comment.\n */\nfunction \'But lwhayyy\' triple(param1: String) { // and why not?\n    const x = 101 +param1 + \'Hey \\\' now \'+  `Dont do it` // A comment + 42;\n    "Why tho?"\n}// A comment "has been" made\n\n/**\n * This is a JSDOC comment.\n */\nfunction \'But lwhayyy\' triple(param1: String) { // and why not?\n    const x = 101 +param1 + \'Hey \\\' now \'+  `Dont do it` // A comment + 42;\n    "Why tho?"\n}')
            })
            .catch(error => {
                console.log(error)
            })
    },
    [])

    /**
     * Handles the text area value change from the text editor.
     * @param event 
     */
    function onTextChange(event: React.SyntheticEvent) {  
        // set the text editor state,
        setText(event.currentTarget.value)
    }

    return (
        <div className="editor-pane">
            {/* Pass the text value to the gutter. */}
            <Gutter lines={Chopstring().splitLines(text).length}/>
            {/* Text editor handles displaying the text and selection */}
            <TextEditor plugin={plugin}
                text={text}
                onTextChange={onTextChange}/>
        </div>
    )
}