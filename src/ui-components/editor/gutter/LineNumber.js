import React, { useState, useContext } from 'react';

/**
 * Component representing the line number in the gutter.
 */
export default function LineNumber(props) {

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

LineNumber.defaultProps = {
    lineNumber: 0
}