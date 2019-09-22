import * as React from 'react'

interface LineProps {
    value: string
}

/**
 * The code editor component handling syntax highlighting and text editing.
 * @property props
 */
export default function Line(props: LineProps) {

    /**
     * Stores the value of this line.
     */
    const value = props.value

    return (
        <div className="line">
            { value }
        </div>
    )
}