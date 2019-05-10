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
     * The id of this pane.
     */
    const id = props.id

    /**
     * The style of this Pane component.
     */
    const width = props.width

    return (
        <div id={id} className="pane" style={{width: width}}>
            { children }
        </div>
    )
}
