// @flow

import React, { useMemo } from 'react';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

/**
 * Displays an array of generated {@link Line} components from a given text.
 * @function
 */
const LineGenerator = React.memo((props) => {

    /**
     * The string text for this component to generate lines from.
     */
    const text = props.text

    /**
     * The {@link LanguagePlugin} to parse this text by.
     */
    const plugin = props.plugin

    /**
     * The chopstring library memoized.
     */
    const chopstring = useMemo(() => Chopstring())
    
    /**
     * Memoize the array of lines split from the text value. Changes only if the text prop changes.
     * @see Chopstring
     */
    const lines = useMemo(() => {
        // return the split lines,
        return chopstring.splitLines(text)
    },
    // pass to the array the text value to trigger re-renders on text change
    [text])

    // return views,
    return (
        <span className="line-generator">
            { 
                 // map the text lines to the Line components...
                 // the line component is going to re render everytime the "key" attribute
                 // changes, therefore we have to pass a unique key that won't change by 
                 // position of the line, as it leads to performance issues when adding new 
                 // line before the unchanged line,
                lines.map((line, index, array) => <Line key={index + line}
                                                line={line} 
                                                plugin={plugin}
                                                index={index}/>
                )
            }
        </span>
    )
// pass a comparison function as a second argument to cancel
// an update if the line props has not changed,
}, (prevProps, nextProps) => {
    // compare if the text has changed or if the language plugin id has changed,
    return (prevProps.text == nextProps.text) && (prevProps.plugin.id == nextProps.plugin.id)
})

export default LineGenerator