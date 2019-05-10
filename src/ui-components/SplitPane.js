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
        isDragging: false,
        dragX: 0,
    })

    /**
     * Handles the mouse down event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseDown(event) {
        // set dragging to true and the startX,
        setSplitPaneState({
            isDragging: true,
            dragX: event.clientX,
        })
    }

    /**
     * Handles the mouse move event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseMove(event) {
        // if in dragging state,
        if (splitPaneState.isDragging) {
            // get the split pane element,
            const splitPane = document.getElementsByClassName("row-split-pane")[0];
            // set the cursor to a resize,
            splitPane.style.cursor = 'col-resize'
            // set user select to none,
            splitPane.style.userSelect = 'none'
            // get the current x pos,
            const currentX = event.clientX
            // find the delta,
            var deltaX = currentX - splitPaneState.dragX
    
            // grab the pane elements,
            const first = document.getElementById("first-pane");
            const second = document.getElementById("second-pane");
    
            // get their original widths,
            var firstWidth = first.offsetWidth
            var secondWidth = second.offsetWidth
    
            // add to width the delta change,
            firstWidth += deltaX
            secondWidth -= deltaX

            // grab the window width,
            const windowWidth = document.documentElement.clientWidth

            // resize according to percentage of the window,
            first.style.width = ((firstWidth / windowWidth) * 100) + '%';
            second.style.width = ((secondWidth / windowWidth) * 100) + '%';
        
            setSplitPaneState({
                isDragging: true,
                dragX: currentX,
            })
        }
    }
    
    /**
     * Handles the mouse down event.
     * @param {React.SyntheticEvent} event Contains event data.
     */
    function onMouseUp(event) {
        // grab the splitpane,
        const splitPane = document.getElementsByClassName("row-split-pane");
        splitPane[0].style.cursor = 'default'
        // set user select to none,
        splitPane.style.userSelect = 'default'
        
        // set dragging to true and the startX,
        setSplitPaneState({
            isDragging: false,
            dragX: event.clientX,
        })
    }

    return (
        <div className="row-split-pane" 
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}>
            {/* The first Pane */}
            <Pane id={'first-pane'} 
                children={<h1>c</h1>}/>
            {/* The resizer inbetween */}
            <Resizer onMouseDownCallback={onMouseDown}
                onMouseUpCallback={onMouseUp}/>
            {/* The second Pane */}
            <Pane id={'second-pane'} 
                children={<EditorPane/>}/>
        </div>
    )
}