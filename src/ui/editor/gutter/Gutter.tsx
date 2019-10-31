import * as React from 'react'

interface GutterProps {
    lines: string[][]
}

/**
 * Code editor gutter displaying line numbers and other gutter related functionalities.
 * @property props
 */
export default function Gutter(props: GutterProps) {

    return (
        <div className="gutter gutter-theme">
            { 
                props.lines.map((line, index) => <span key={index} className="token line-number">{index + 1}</span>)
            }
        </div>
    )
}