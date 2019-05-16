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
     * Tee language plugin to tokenise by.
     */
    const plugin = props.plugin

    // get the language plugin tokens from the line,
    const tokens = plugin.lang_features !== undefined ? Chopstring().applyPatterns(line, plugin) : []


    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className="line-generator">
            {tokens.map(token => <span className={'token'}>{token.id}</span>)}
        </div>
    )
}