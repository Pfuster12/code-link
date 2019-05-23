// @flow

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';

/**
 * Generates a highlighted syntax Line from the given line string value in the props.
 * @see TextEditor
 */
export default function Line(props) {

    /**
     * The string to generate highlighted tokens.
     */
    const line = props.line

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    /**
     * Instance of the tokeniser library.
     */
    const chopstring = Chopstring()

    // get the language plugin tokens from the line,
    const tokens = plugin.features !== undefined ? chopstring.applyTokenPatterns(line, plugin) : []

    // split the line by spans according to the language plugin tokens,
    const spans = tokens.map(token => {
        const span = line.substring(token.startIndex, token.lastIndex)
        return span
    })
    console.log('Spans are', spans)

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className="token-generator">
            {
                spans.map((span, index) => <span key={tokens[index].lastIndex} className={'token '+ tokens[index].id.replace(".", " ").trim()}>{span}</span>)
            }
        </div>
    )
}