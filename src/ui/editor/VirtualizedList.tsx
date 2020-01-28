import * as React from 'react'
import { useState, useMemo, useLayoutEffect } from 'react'
import { useWindowSize } from '../utils/CustomHooks'

interface VirtualizedListProps {
    children?: React.ReactChild,
    id: string,
    innerWidth: number | string,
    width: number,
    height: number,
    rowHeight: number,
    overflowCount: number,
    count: number,
    onScrollCallback?: (event: React.SyntheticEvent) => void,
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

    // Store the scrolltop.
    const [scrollTop, setScrollTop] = useState(0)

    // Measured dimensions of this List Viewport.
    const [measuredDimens, setMeasuredDimens] = useState({
        width: 0,
        height: 0
    })

    /**
     * Determine user dimensions input. Default to 100% if not a positive number.
     */
    const {width, height} = useMemo(() => {
        const width = props.width > 0 ? props.width : '100%'
        const height = props.height > 0 ? props.height : '100%'

        return {
            width: width,
            height: height
        }
    },
    [props.width, props.height])

    /**
     * Use custom window resize hook.
     */
    const winDimensions = useWindowSize()

    /**
     * Layout effect to find measured dimensions of list viewport.
     */
    useLayoutEffect(() => {
        const listElement = document.getElementById(props.id) as HTMLDivElement
        console.log('Relayout on window resize.');
        
        setMeasuredDimens({
            width: listElement.clientWidth,
            height: listElement.clientHeight
        })
    },
    [props.id, width, height, winDimensions.height, winDimensions.width])

    /**
     * Memoize FIXED visible item count.
     */
    const itemCount = useMemo(() => {
        const count = Math.floor((measuredDimens.height + (2*props.overflowCount*props.rowHeight))/props.rowHeight)
        const items = Math.min(props.count, count)

        const a = []
        var i;
        for (i = 0; i < items; i++) {
            a.push(i)
        }
        return a
    },
    [props.count,  props.overflowCount, props.rowHeight, measuredDimens.height])

    const [visibleItems, setVisibleItems] = useState([])
    
    /**
     * Layout effect to get array of VIRTUAL indexed visible items to render.
     */
    useLayoutEffect(() => {
        if (props.count > 0) {
            const position = Math.floor(scrollTop / props.rowHeight) - props.overflowCount
            const visible = Math.min(props.count, position + itemCount.length  + (props.overflowCount*2))        
            const a = []
            var i;
            for (i = position; i < visible; i++) {
                a.push(i)
            }
    
            setVisibleItems(a)
        }
    },
    [props.count, props.overflowCount, props.rowHeight, itemCount, scrollTop])

    /**
     * Handles the scroll event of the virtualised list window.
     * @param event 
     */
    function onScroll(event: React.SyntheticEvent) {
        props.onScrollCallback && props.onScrollCallback(event)
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
        <div id={props.id}
            style={{
                width: width,
                height: height
            }}
            onScroll={onScroll}>
                {/* Contained div with full list height to overflow the fixed width div */}
                <div
                    style={{ 
                        position: 'absolute', 
                        whiteSpace: 'nowrap',
                        width: props.innerWidth,
                        height: props.count * props.rowHeight
                    }}>
                    {
                        visibleItems.map(item => props.renderItem(item, itemStyle(item)))
                    }
                </div>
                {
                    /* Optional views to add to scrolling viewport. */
                    props.children
                }
        </div>
    )
}