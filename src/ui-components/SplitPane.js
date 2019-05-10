import React, { useState } from 'react'
import Pane from './Pane'
import Resizer from './Resizer'
import EditorPane from './editor/EditorPane';

/** 
 * A set of two panes that respond to each others resizing by a Resizer.
 * @see Pane
 * @see Resizer
 */
export default function SplitPane(props) {

    /**
     * A variable for the split pane state holding information
     * such as its width, change in width and dragging state.
     */
    const [splitPaneState, setSplitPaneState] = useState({
        dragX: 0,
        deltaX: 0
    })

    /**
     * Handles the mouse down event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseDown(event) {
        // set dragging to true and the startX,
        setSplitPaneState({
            dragX: event.clientX,
            deltaX: splitPaneState.deltaX
        })
    }

    /**
     * Handles the mouse move event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseMove(event) {
        const currentX = event.clientX

        setSplitPaneState({
            dragX: splitPaneState.dragX
            deltaX: currentX - splitPaneState.dragX
        })
    }
    
    /**
     * Handles the mouse down event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseUp(event) {
        // set dragging to false,
        setSplitPaneState({
            isDragging: false,
            width: splitPaneState.deltaX,
            deltaX: splitPaneState.deltaX,
            startX: splitPaneState.startX
        })
    }

    // set the deltaX in px for the style prop,
    const resize = `${splitPaneState.deltaX}px`

    return (
        <div className="row-split-pane" 
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            {/* The first Pane */}
            <Pane id={'first-pane'} children={<h1>code-link</h1>}
                width={resize}/>
            {/* The resizer inbetween */}
            <Resizer onMouseDownCallback={onMouseDown}
                onMouseUpCallback={onMouseUp}/>
            {/* The second Pane */}
            <Pane id={'second-pane'} children={<EditorPane/>}/>
        </div>
    )
}