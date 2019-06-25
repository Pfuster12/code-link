// @flow

import React, { useState, useLayoutEffect } from 'react';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

/**
 * Displays an array of generated {@link Line} components from a given text.
 * @function
 */
export default function LineGenerator(props) {

    /**
     * Stores the line components from this line generator.
     */
    const [lines, setLines] = useState([])

    /**
     * Stores the multi token flag to indicate a multi line token is open.
     * The token is stored to send into the next Lines and these match the 'end'
     * property of the multi token
     */
    const [multiToken, setMultiToken] = useState({})

    /**
     * The text for this component to generate lines from.
     */
    const text = props.text

    /**
     * The {@link LanguagePlugin} to parse this text by.
     */
    const plugin = props.plugin

    /**
     * Callback to listen for multi token flags.
     */
    function onMultiTokenTriggered(token) {
        console.log('LineGenerator callback triggered: Multi token is:', token);
        
        setMultiToken(token)
    }
    
    /**
     * Layout effect to generate the lines. Changes only if the 
     * text prop changes.
     */
    useLayoutEffect(() => {

        // the tokeniser library chopstring.js,
        const chopstring = Chopstring()

        // split the text by new line,
        const textLines = chopstring.splitLines(text)

        // map the text lines to Line components...
        var endOfLineState = ""

        const lineList = textLines.map((line, index) => {
            return <Line key={index.toString() + line}
                        line={line} 
                        plugin={plugin}
                        onMultiTokenTriggered={onMultiTokenTriggered}
                        multiToken={multiToken}/>
        })

        // and set state to store the lines,
        setLines(lineList)
    },
    [text, multiToken])

    // return views,
    return (
        <span className="line-generator">
            { lines }
        </span>
    )
}