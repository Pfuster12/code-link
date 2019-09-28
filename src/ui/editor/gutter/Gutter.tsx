import * as React from 'react'

interface GutterProps {
    
}

/**
 * Code editor gutter displaying line numbers and other gutter related functionalities.
 * @property props
 */
export default function Gutter(props: GutterProps) {

    return (
        <div className="gutter">
            { 
                <span>1</span>
            }
        </div>
    )
}