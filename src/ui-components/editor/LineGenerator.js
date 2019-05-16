// @flow

import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'
import TokenGenerator from './TokenGenerator';

/**
 * Generates a highlighted syntax line from the given text value in the props.
 * @see TextEditor
 */
export default function LineGenerator(props) {

    /**
     * The string to generate highlighted tokens.
     */
    const lines = props.lines

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin
    
    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <div className="line-generator">
            {lines.map(line => <span className={'token'}>
                    <TokenGenerator line={line}
                        plugin={plugin}/>
                </span>)
            }
        </div>
    )
}