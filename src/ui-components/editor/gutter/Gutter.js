import React, { useContext, useState } from 'react';
import LineNumber from './LineNumber';

/**
 * Handles the Gutter for the code {@link Editor}, displaying the line 
 * numbers and other functionalities related to the gutter.
 * @see Editor
 */
export default function Gutter(props) {

    /**
     * The array of lines in the text editor text.
     */
    const lines = props.lines
    console.log('Gutter initialised.')

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