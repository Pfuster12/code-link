// @flow

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';

/**
 * Generates a highlighted syntax token from the given line value in the props.
 * @see TextEditor
 */
export default function TokenGenerator(props) {

    /**
     * The string to generate highlighted tokens.
     */
    const line = props.line

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    // get the language plugin tokens from the line,
    const tokens = plugin.lang_features !== undefined ? Chopstring().applyPatterns(line, plugin) : []

    // add an end of line token,
    tokens.push({startIndex: line.length, id: 'end'})

    // split the line by spans according to the language plugin tokens,
    var previousIndex = 0
    const spans = tokens.map(token => {
        const span = line.substring(previousIndex, token.startIndex)
        previousIndex = token.startIndex
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
                spans.map((span, index) => <span className={'token ' + (tokens[index - 1] ? tokens[index - 1].id.replace(".", " ") : "")}>{span}</span>)
            }
        </div>
    )
}