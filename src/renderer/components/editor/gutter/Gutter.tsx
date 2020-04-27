import * as React from 'react';

interface GutterProps {
    lines: string[]
}

/**
 * Represents a File item.
 */
export default function Gutter(props: GutterProps) {
 
    return (
        <div className="gutter theme">
            {
                props.lines.map((line, index) => 
                    <span key={index} className="gutter-line-number theme">{index}</span>)
            }
        </div>
    )
}

