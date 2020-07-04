import { useState, useLayoutEffect } from "react"

/**
 * Custom hook to listen to window resize event with a debounce function.
 */
export function useWindowSize() {
    /**
     * Window dimensions to update component on resize.
     */
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    })

    /**
     * A debounce operation throttles or waits between calls to a function for performance reasons.
     * @param fn 
     * @param ms 
     */
    function debounce(fn: () => void, ms: number) {
        var timer: any
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                fn.apply(this)
            }, ms)
        }
    }

    /**
     * Effect to update component on window resize with throttle.
     */
    useLayoutEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
            }, 30)
    
        window.addEventListener('resize', debouncedHandleResize)

        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    },
    [])

    return dimensions
}