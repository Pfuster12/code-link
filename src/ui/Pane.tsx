import * as React from 'react'

interface PaneProps {
    children: JSX.Element,
    id: string
}

/** 
 * Represents a container of any view that can be resized.
 */
export default function Pane(props: PaneProps) {

    /**
     * The children views of this Pane.
     */
    const children = props.children

     /**
     * The id of this pane.
     */
    const id = props.id

    return (
        <section id={id} className="pane">
            { children }
        </section>
    )
}
