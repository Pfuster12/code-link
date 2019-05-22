// @flow

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'
import Chopstring from '../../lexer/chopstring';

/**
 * Generates a highlighted syntax token from the given line value in the props.
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

    // get the language plugin tokens from the line,
    const tokens = plugin.features !== undefined ? Chopstring().applyTokenPatterns(line, plugin) : []

    // get the language plugin tokens from the line,
    const multiTokens = plugin.features_multi !== undefined ? Chopstring().applyMultiTokenPatterns(line, plugin) : []

    // split the line by spans according to the language plugin tokens,
    var previousIndex = 0
    const spans = tokens.map(token => {
        const span = line.substring(previousIndex, token.lastIndex)
        previousIndex = token.lastIndex
        return span
    })
    console.log('Spans are', spans)

    // split the line by spans according to the language plugin tokens,
    const multiSpans = multiTokens.map(token => {
        const span = line.substring(token.startIndex, token.lastIndex)
        previousIndex = token.lastIndex
        return span
    })
    console.log('Multi spans are', multiSpans)

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className="token-generator">
            {
                multiSpans.map((span, index) => <span key={multiTokens[index].lastIndex} className={'token '+ multiTokens[index].id.replace(".", " ").trim()}>{span}</span>)}
                {spans.map((span, index) => <span key={tokens[index].lastIndex} className={'token '+ tokens[index].id.replace(".", " ").trim()}>{span}</span>)
            }
        </div>
    )
}