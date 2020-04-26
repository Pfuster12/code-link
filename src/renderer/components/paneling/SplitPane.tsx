import * as React from 'react';
import Pane from './Pane';
import { useRef } from 'react';

interface SplitPaneProps {
    children: JSX.Element[],
    orientation: SplitPaneOrientation
}

export enum SplitPaneOrientation {
    VERTICAL,
    HORIZONTAL
}

/**
 * Holds to Panes that can be resized on either orientation.
 */
export default function SplitPane(props: SplitPaneProps) {

    // Split Pane ref.
    const splitPaneRef = useRef(null)

    // Left Pane ref.
    const leftResizeable = useRef(null)

    function handleResize(event: React.MouseEvent) {
        event.preventDefault()
        // get point X
        const xOffset = event.pageX
        // get current left pane width
        const leftPaneWidth = leftResizeable.current.clientWidth

        const mouseDragHandler = (moveEvent: PointerEvent) => {
            moveEvent.preventDefault();
            const primaryButtonPressed = moveEvent.buttons === 1;

            // on mouse release remove event.
            if (!primaryButtonPressed) {
                document.body.removeEventListener('pointermove', mouseDragHandler);
                return;
            }

            // Calculates the delta change to add to the current pane width,
            const leftWidth = (xOffset - moveEvent.pageX) * -1 + leftPaneWidth

            // sets width as a percentage of the split pane width.
            leftResizeable.current.style.width = `${(leftWidth / splitPaneRef.current.clientWidth)*100}%`           
        }

        document.body.addEventListener('pointermove', mouseDragHandler);
    }

    return (
        <div className={
            props.orientation === SplitPaneOrientation.HORIZONTAL
            ? "split-pane" 
            : "split-pane vertical"}
            ref={splitPaneRef}>
            <section className="pane" 
                ref={leftResizeable}>
                { props.children[0] }        
            </section>
            <div className="resizer theme" onMouseDown={handleResize}/>
            <section className="pane resizeable">
                { props.children[1] }
            </section>
        </div>
    )
}

