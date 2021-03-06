import * as React from 'react'
import { useLayoutEffect } from 'react'
import VirtualizedList from '../VirtualizedList'

interface GutterProps {
    lines: string[][],
    scrollTop: number,
    onScrollCallback?: (event: React.SyntheticEvent) => void
}

/**
 * Code editor gutter displaying line numbers and other gutter related functionalities.
 * @property props
 */
export default function Gutter(props: GutterProps) {

    return (
        <div className="gutter gutter-theme">
            <VirtualizedList
                id="gutter-virtualized-list"
                width={60}
                innerWidth={60}
                height={-1}
                rowHeight={19}
                count={props.lines.length}
                overflowCount={4}
                onScrollCallback={props.onScrollCallback}
                scrollTop={props.scrollTop}
                renderItem={(index, style) =>
                {
                    return <span style={style} key={index} className="token line-number line-number-theme">{index + 1}</span>
                }}/>
        </div>
    )
}