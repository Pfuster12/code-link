import React, { useContext, useState } from 'react';
import LineNumber from './LineNumber';

/**
 * Handles the Gutter for the code {@link Editor}, displaying the line 
 * numbers and other functionalities related to the gutter.
 * @see Editor
 */
export default function Gutter(props) {

    // split the lines from the text with the regex,
    const lines = props.lines

    return (
        <div className="gutter gutter-theme">
            {/* Map the lines to LineNumber components. */}
            {lines.map((line, index) => <LineNumber key={index + 1} lineNumber={index + 1}/>)}
        </div>
    )
}

Gutter.defaultProps = {
    lines: [0]
}