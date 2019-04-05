import React from 'react';
import R from 'res/R';

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
        <div style={R.styles.resizerStyle}
            onMouseDown={onMouseDownCallback}>
        </div>
    )
}