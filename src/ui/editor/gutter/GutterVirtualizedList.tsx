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
 * Displays a virtualized list for the gutter.
 * @description
 * A virtualized list is used for large dataset arrays to improve rendering performance issues.
 * The list displays enough items to fill the window + some extra for scroll performance. As the
 * list is scrolled out of the window, the items are moved from the outgoing side and placed into the
 * incoming side with CSS positioning, giving the illusion of the infinite scroll.
 */
export default function GutterVirtualizedList(props: VirtualizedListProps) {

    // store the scrolltop.
    const [scrollTop, setScrollTop] = useState(0)

    const itemCount = useMemo(() => {
        const itemCount = Math.floor((props.height + (2*props.overflowCount*props.rowHeight))/props.rowHeight)
        const items = Math.min(props.count, itemCount)

        const a = []
        var i;
        for (i = 0; i < items; i++) {
            a.push(i)
        }
        return a
    },
    [props.count])

    const [visibleItems, setVisibleItems] = useState([])
    
    function getVisibleItems(scrollTop: number) {
        if (props.count > 0) {
            const position = Math.floor(scrollTop / props.rowHeight) - props.overflowCount
            const visible = Math.min(props.count, position + itemCount.length + (props.overflowCount*2))
            const a = []
            var i;
            for (i = position; i < visible; i++) {
                a.push(i)
            }
    
            setVisibleItems(a)
        }
    }

    useLayoutEffect(() => {
        getVisibleItems(scrollTop)
    },
    [props.count, scrollTop])

    /**
     * Handles the scroll event of the virtualised list window.
     * @param event 
     */
    function onScroll(event: React.SyntheticEvent) {
        setScrollTop(event.currentTarget.scrollTop)
    }

    /**
     * Creates absolute position style according to item index.
     * @param index 
     */
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
        <div className="gutter-virtualized-list"
            style={{
                width: props.width,
                height: props.height
            }}
            onScroll={onScroll}>
                {/* Contained div with full list height to overflow the fixed width div */}
                <div
                    style={{ 
                        position: 'absolute', 
                        whiteSpace: 'nowrap',
                        width: props.width,
                        height: props.count * props.rowHeight
                    }}>
                    {
                        visibleItems.map(item => props.renderItem(item, itemStyle(item)))
                    }
                </div>
        </div>
    )
}