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

    const leftResizeable = useRef(null)
    const rightResizeable = useRef(null)

    React.useEffect(() => {
        leftResizeable.current.style.width = `${200}px`
    },
    [])

    function handleResize(event: React.MouseEvent) {
        event.preventDefault()
        const xOffset = event.pageX
        const startingPaneWidth = leftResizeable.current.clientWidth

        const mouseDragHandler = (moveEvent: PointerEvent) => {
            moveEvent.preventDefault();
            const primaryButtonPressed = moveEvent.buttons === 1;

            // on mouse release remove event.
            if (!primaryButtonPressed) {
                document.body.removeEventListener('pointermove', mouseDragHandler);
                return;
            }

            // resize according to direction of pointer,
            const direction = xOffset > moveEvent.pageX ? 'left' : 'right'
            
            leftResizeable.current.style.width = `${(xOffset - moveEvent.pageX) * -1 + startingPaneWidth}px`
        };

        document.body.addEventListener('pointermove', mouseDragHandler);
    }

    return (
        <div className={
            props.orientation === SplitPaneOrientation.HORIZONTAL
            ? "split-pane" : "split-pane vertical"}>
            <section className="pane" 
                ref={leftResizeable}>
                { props.children[0] }        
            </section>
            <div className="resizer theme" onMouseDown={handleResize}/>
            <section className="pane"
                ref={rightResizeable}>
                { props.children[1] }
            </section>
        </div>
    )
}

