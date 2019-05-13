import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'

/**
 * Generates a highlighted syntax line from a given string in the props.
 * @see TextEditor
 */
export default function TokenGenerator(props) {

    /**
     * The string to generate highlighted tokens.
     */
    const token = props.token

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
        <span className={token.id}>{token}</span>
    )
}