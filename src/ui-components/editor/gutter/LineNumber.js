import React from 'react';

/**
 * Component representing the line number in the gutter.
 */
const LineNumber = React.memo((props) => {

    /**
     * The line number passed in this component props.
     */
    const lineNumber = props.lineNumber

    return (
        <div className="line-number-parent">
            <span className="line-number token">{lineNumber}</span>
        </div>
    )
}, (prevProps, nextProps) => {
    return prevProps.lineNumber === nextProps.lineNumber
})

LineNumber.defaultProps = {
    lineNumber: 0
}

export default LineNumber