import * as React from 'react'
import { useLayoutEffect } from 'react'
import GutterVirtualizedList from './GutterVirtualizedList'

interface GutterProps {
    lines: string[][],
    scrollTop: number
}

/**
 * Code editor gutter displaying line numbers and other gutter related functionalities.
 * @property props
 */
export default function Gutter(props: GutterProps) {

    /**
     * Layout effect to scroll with text editor scrollTop.
     */
    useLayoutEffect(() => {
        const gutterElement = document.querySelector('.gutter-virtualized-list')
        gutterElement.scrollTop = props.scrollTop
    }, 
    [props.scrollTop])

    return (
        <div className="gutter gutter-theme">
            <GutterVirtualizedList
                width={60}
                height={400}
                rowHeight={19}
                count={props.lines.length}
                overflowCount={4}
                renderItem={(index, style) =>
                {
                    return <span style={style} key={index} className="token line-number">{index + 1}</span>
                }}/>
        </div>
    )
}