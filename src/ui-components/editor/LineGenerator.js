// @flow

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'

type LineGeneratorProps = {
    textEditor: {
        tokens: Array<{
            token: Map,
            index: Number,
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
export default function LineGenerator(props: LineGeneratorProps) {

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

    /**
     * Parent style to inherit for all tokens from the theme.
     */
    const tokenParentStyle = {
        display: 'block',
        whiteSpace: 'pre',
        lineHeight: theme.editorTextStyle.lineHeight,
        fontSize: theme.editorTextStyle.fontSize,
        fontFamily: theme.editorTextStyle.fontFamily,
    }

    return (
        <div className="line-generator">
            <span style={tokenParentStyle}>{Array.from(textEditor.tokens, ([key, token]) => !token.id.match('expression') && token.value)}</span>
        </div>
    )
}