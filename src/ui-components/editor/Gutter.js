import React, { useContext, useState } from 'react';
import LineNumber from './LineNumber';
import { ThemeContext } from '../../theme/theme-context'

/**
 * Handles the Gutter for the code {@link Editor}, displaying the line 
 * numbers and other functionalities related to the gutter.
 * @see Editor
 */
export default function Gutter(props) {

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    /**
     * A new-line separator RegEx for any platform.
     * @see RegExp
     */
    const lineRegex = new RegExp('\r|\r\n|\n')

    // split the lines from the text with the regex,
    const lines = props.text.split(lineRegex)

    /**
     * This component's style.
     */
    const gutterStyle = {
        backgroundColor: theme.gutterBackgroundColor
    }

    return (
        <div className="gutter" style={gutterStyle}>
            {/* Map the lines to LineNumber components. */}
            {lines.map((line, index) => <LineNumber key={index + 1} lineNumber={index + 1}/>)}
        </div>
    )
}