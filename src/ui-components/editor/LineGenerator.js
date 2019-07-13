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
     * Stores the string of lines from this line generator.
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
     * Callback trigger for a multitoken.
     * @param token 
     * @param startIndex 
     * @param endIndex 
     */
    function multiTokenTrigger(token, startIndex, endIndex) {
        console.log('%c MultiToken triggered at line ', 'color: brown', startIndex);
        
    }
    
    /**
     * Layout effect to generate the lines. Changes only if the text prop changes.
     * @see Chopstring
     */
    useLayoutEffect(() => {
        // the tokeniser library chopstring.js,
        const chopstring = Chopstring()

        // split the text by new line,
        const textLines = chopstring.splitLines(text)

        // and set state to store the lines of strings split by new line,
        setLines(textLines)
    },
    // pass to the array the text value to trigger re-renders on text change
    [text])

    // return views,
    return (
        <span className="line-generator">
            { 
                 // map the text lines to the Line components,
                lines.map((line, index) => {
                    // return the line,
                    return <Line key={index.toString() + line}
                                line={line} 
                                plugin={plugin}
                                index={index}/>
                })
            }
        </span>
    )
}