import * as React from 'react'
import { useState, useMemo, useLayoutEffect } from 'react'

interface VirtualizedListProps {
    width: number,
    height: number,
    rowHeight: number,
    overflowCount: number,
    count: number,
    renderItem: (index: number, style: Object) => React.ReactElement
}

/**
 * Displays a virtualized list.
 * @description
 * A virtualized list is used for large dataset arrays to improve rendering performance issues.
 * The list displays enough items to fill the window + some extra for scroll performance. As the
 * list is scrolled out of the window, the items are moved from the outgoing side and placed into the
 * incoming side with CSS positioning, giving the illusion of the infinite scroll.
 */
export default function VirtualizedList(props: VirtualizedListProps) {

    // store the scrolltop.
    const [scrollTop, setScrollTop] = useState(0)

    const itemCount = useMemo(() => {
        var i;
        const a = []
        for (i = 0; i < props.count; i++) {
            a.push(i)
        }
        return a
    },
    [props.count])
    

    /**
     * Handles the scroll event of the virtualised list window.
     * @param event 
     */
    function onScroll(event: React.SyntheticEvent) {
        setScrollTop(event.currentTarget.scrollTop)
    }

    function checkIfVisible(index: number): boolean {        
        const pos = index * props.rowHeight

        return pos > (scrollTop - props.rowHeight)
            && (pos + props.rowHeight) < (scrollTop + props.height)
    }

    function itemStyle(index: number): Object {
        return {
            height: props.rowHeight,
            left: 0,
            right: 0,
            top: props.rowHeight * index,
            position: 'absolute'
        }
    }

    return (
        <div className="virtualized-list"
            style={{
                width: props.width,
                height: props.height
            }}
            onScroll={onScroll}>
                {/* Contained div with full list height to overflow the fixed width div */}
                <div style={{ 
                    position: 'absolute', 
                    whiteSpace: 'nowrap', 
                    height: props.count * props.rowHeight}}>
                    {
                        itemCount.map(item => 
                            checkIfVisible(item) && props.renderItem(item, itemStyle(item))
                        )
                    }
                </div>
        </div>
    )
}