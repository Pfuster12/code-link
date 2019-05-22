import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../../theme/theme-context'

/**
 * Component representing the line number in the gutter.
 */
export default function LineNumber(props) {

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    /**
     * The line number passed in this component props.
     */
    const lineNumber = props.lineNumber

    return (
        <div className="line-number-parent">
            <span className="line-number token">{lineNumber}</span>
        </div>
    )
}