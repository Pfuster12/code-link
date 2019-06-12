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
     * The text for this component to generate lines from.
     */
    const text = props.text

    /**
     * The {@link LanguagePlugin} to parse this text by.
     */
    const plugin = props.plugin
    
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
                        plugin={plugin}/>
        })

        // and set state to store the lines,
        setLines(lineList)
    },
    [text])

    // return views,
    return (
        <span className="line-generator">
            { lines }
        </span>
    )
}