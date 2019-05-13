import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'

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

    /**
     * Style of the line number.
     */
    const lineNumberStyle = {
        lineHeight: theme.editorTextStyle.lineHeight,
        fontSize: theme.editorTextStyle.fontSize,
    }

    return (
        <div className="line-number-parent">
            <span className="line-number" 
                style={lineNumberStyle}>{lineNumber}</span>
        </div>
    )
}