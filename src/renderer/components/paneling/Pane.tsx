import * as React from 'react';

interface PaneProps {
    children: JSX.Element
}

/**
 * Holds content in a Split Pane system.
 */
export default function Pane(props: PaneProps) {

    return (
        <section>
            {props.children}
        </section>
    )
}

