import React, { useState, useContext } from 'react';
import R from 'res/R';
import { ThemeContext } from '../../theme/theme-context'

/**
 * Generates a highlighted syntax line from a given string in the props.
 * @see TextEditor
 */
export default function LineGenerator(props) {

    /**
     * The string to generate highlighted tokens.
     */
    const text = props.text

    /**
     * A new-line separator RegEx for any platform (respecting an optional Windows and
     * Mac CRLF) with positive lookbehind to split a line by newline while keeping
     * the delimiters.
     */
    const lineRegex = /(?<=\r?\n)/gm

    // split the lines from the text with the regex,
    const lines = text.split(lineRegex)

    console.log(lines)

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

    const containerStyle = {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    }

    return (
        <div style={containerStyle}>
            {lines.map((line, index) => <span style={tokenParentStyle}>{line}</span>)}
        </div>
    )
}