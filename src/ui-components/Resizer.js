import React from 'react';

/**
 * A view in-between two {@link Panes} to resize them horizontally.
 * @see Pane
 * @class
 */
export default function Resizer(props) {

    /**
     * The mouse click down callback to apply to this Resizer div component
     * for listening to drag movement on the resizer.
     */
    const onMouseDownCallback = props.onMouseDownCallback

    return (
        <div className="resizer"
             onMouseDown={onMouseDownCallback}>
        </div>
    )
}