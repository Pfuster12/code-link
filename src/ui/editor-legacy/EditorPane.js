import React, { useState, useMemo, useContext, useEffect } from './react';
import Gutter from './gutter/Gutter';
import TextEditor from './TextEditor';
import PluginReader from '../../lexer/PluginReader';
import Chopstring from '../../lexer/chopstring';
import FileReader from '../../io/FileReader';

/**
 * Editor window handling text input and displaying code text. Displays a code editor
 * and a gutter to the left hand side for code editing functionality.
 * @see TextEditor
 * @see Gutter
 */
export default function EditorPane() {

    /**
     * Stores the current value of this file's text. Default to an empty string for now.
     */
    const [text, setText] = useState('')

    /**
     * Stores the current language plugin to parse this Editor's text.
     */
    const [plugin, setPlugin] = useState({})

    /**
     * Stores the line count in the {@link TextEditor} for the {@link Gutter} component.
     */
    const [lines, setLines] = useState(1)

    /**
     * Effect to read the current selected language plugin to parse the text.
     * Run only once for now...
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
            })
            .catch(error => {
                console.log(error)
            })
    },
    [])

    /**
     * Effect to read the current selected file and set the text state of this editor pane.
     */
    useEffect(() => {
        // TEMP
        // get an instance of the file reader,
        const fr = FileReader()

        // read a test file...
        fr.readFile('./src/test/files/coffee.txt')
            .then(res => {
                console.log(res);

                // set the text result,
                setText(res)
            })
            .catch(err => {
                console.log('Error reading from file', err);
            
                // set an empty text value,
                setText('')
            })
    },
    [])

    /**
     * TextEditor line array listener.
     */
    function editorListener(length: number) {
        setLines(length)
    }

    return (
        <div className="editor-pane">
            {/* Pass the amount of lines to the gutter. */}
            <Gutter lines={lines}/>
            {/* Text editor handles displaying the text and selection */}
            {
                <TextEditor plugin={plugin}
                    text={text}
                    editorListener={editorListener}/>
            }
        </div>
    )
}