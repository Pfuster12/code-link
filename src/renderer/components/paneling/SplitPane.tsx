import * as React from 'react';
import Pane from './Pane';

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

    return (
        <div className={
            props.orientation === SplitPaneOrientation.HORIZONTAL
            ? "split-pane-horizontal" : "split-pane-vertical"}>
            <Pane>
                { props.children[0] }
            </Pane>
            <Pane>
                { props.children[1] }
            </Pane>
        </div>
    )
}

