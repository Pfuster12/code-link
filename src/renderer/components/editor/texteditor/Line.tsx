import * as React from 'react';

interface LineProps {
    line: string
}

/**
 * Represents a File item.
 */
export default function Line(props: LineProps) {

    return (
        <span className="line theme">
            <span className="token theme">{props.line}</span>
        </span>
    )
}

