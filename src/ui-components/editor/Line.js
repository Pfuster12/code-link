// @flow

import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';

/**
 * Generates a highlighted syntax Line from the given line string value in the props.
 * @see TextEditor
 */
export default function Line(props) {

    /**
     * State for the line selection.
     */
    const [line, setLine] = useState({
        tokens: [],
        spans: []
    })

    /**
     * The string to generate highlighted tokens.
     */
    const string = props.line

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    useEffect(() => {
        /**
         * Instance of the tokeniser library.
         */
        const chopstring = Chopstring()

        // get the language plugin tokens from the line,
        const tokens = plugin.features !== undefined ? chopstring.applyTokenPatterns(string, plugin) : []

        // split the line by spans according to the language plugin tokens,
        setLine({
            tokens: tokens,
            spans: tokens.map(token => {
                const span = string.substring(token.startIndex, token.lastIndex)
                return span
            })
        })
    },
    [])

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className="token-generator">
            {
                line.spans.map((span, index) => <span key={line.tokens[index].lastIndex} className={'token '+ line.tokens[index].id.replace(".", " ").trim()}>{span}</span>)
            }
        </div>
    )
}