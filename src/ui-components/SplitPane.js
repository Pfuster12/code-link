import React, { useState } from 'react'
import Pane from './Pane'
import Resizer from './Resizer'
import R from 'res/R';
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
        // remembers if user is currently dragging the resizer,
        isDragging: false,
        // initialise a width for the left pane,
        width: 160,
        // stores the current change in X direction of a resizer drag,
        deltaX: 160,
        // stores the startX position of the event,
        startX: 0
    })

    /**
     * Handles the mouse down event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseDown(event) {
        // set dragging to true and the startX,
        setSplitPaneState({
            isDragging: true,
            width: splitPaneState.width,
            deltaX: splitPaneState.deltaX,
            startX: event.clientX
        })
    }

    /**
     * Handles the mouse move event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseMove(event) {
        // grab the X position of the mouse click and set the state to be dragging,
        if (splitPaneState.isDragging) {
            // calculate the delta of the drag,
            var dX = splitPaneState.width + event.clientX - splitPaneState.startX
            // set the state with the moving deltaX,
            setSplitPaneState({
                isDragging: splitPaneState.isDragging,
                width: splitPaneState.width,
                deltaX: dX,
                startX: splitPaneState.startX
            })
        }
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
    
    // CSS style for the container of the SplitPane,
    const resizeStyle = {
        display: 'flex',
        flexDirection: 'column',
        // the width is assigned dynamically with dragging,
        width: resize
    }

    return (
        <div style={R.styles.rowWrapper}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            {/* The first Pane */}
            <Pane children={<div><h1>code-link</h1></div>}
                style={resizeStyle}/>
            {/* The resizer inbetween */}
            <Resizer
                onMouseDownCallback={onMouseDown}/>
            {/* The second Pane */}
            <Pane children={<EditorPane/>}
                style={R.styles.rowWrapper}/>
        </div>
    )
}