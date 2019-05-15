// @flow

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'

type LineGeneratorProps = {
    textEditor: {
        tokens: Map<Number, {
            token: string,
            id: string
        }>,
        value: String,
        selectionStart: Number,
        selectionEnd: Number
    }
}

/**
 * Generates a highlighted syntax line from the given text value in the props.
 * @see TextEditor
 */
export default function TokenGenerator(props: LineGeneratorProps) {

    /**
     * The string to generate highlighted tokens.
     */
    const textEditor = props.textEditor

    /**
     * A new-line separator RegEx for any platform (respecting an optional Windows and
     * Mac CRLF) with positive lookbehind to split a line by newline while keeping
     * the delimiters.
     */
    const lineRegex = /(?<=\r?\n)/gm
    
    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className="token-generator">
            <span className="token-parent default-text">
            {
                // iterate through the map of tokens,
                Array.from(textEditor.tokens, ([key, token]) =>
                    !token.id.match('expression') && <span key={key} className={token.id}>{token.value}</span>
                )
            }
            </span>
        </div>
    )
}