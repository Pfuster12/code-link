import React from 'react'

/** 
 * Represents a container of any view that can be resized.
 */
export default function Pane(props) {

    /**
     * The children views of this Pane.
     */
    const children = props.children

    /**
     * The style of this Pane component.
     */
    const style = props.style

    return (
        <div style={style}>
            { children }
        </div>
    )
}