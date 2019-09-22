import React from './react';
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

    return (
        <div className="gutter gutter-theme">
            {/* Map the lines to LineNumber components. */}
            {
                Array(lines).fill(lines).map((line, index) => <LineNumber key={index + 1} lineNumber={index + 1}/>)
            }
        </div>
    )
}

// define default props,
Gutter.defaultProps = {
    // default to 0,
    lines: 0
}