// @flow

import React, { useState, useMemo } from 'react';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

/**
 * Displays an array of generated {@link Line} components from a given text.
 * @function
 */
const LineGenerator = React.memo( function LineGenerator(props) {

    /**
     * The string text for this component to generate lines from.
     */
    const text = props.text

    /**
     * The {@link LanguagePlugin} to parse this text by.
     */
    const plugin = props.plugin

    /**
     * The line array keys. They are unique in order to optimise React rendering.
     */
    const keys = props.keys

    /**
     * The key-line Map of strings to tokenise by the {@link Line} components.
     */
    const lines = props.lines

    // return views,
    return (
        <span className="line-generator">
            { 
                 // map the text lines to the Line components...
                 // the line component is going to re render everytime the "key" attribute
                 // changes, therefore we have to pass a unique key that won't change by 
                 // position of the line, as it leads to performance issues when adding new 
                 // line before the unchanged line,
                 lines.map(([key, value], index) => {
                    return <Line key={key}
                            line={value}
                            index={index} 
                            plugin={plugin}/>
                 })
            }
        </span>
    )
// pass a comparison function as a second argument to cancel
// an update if the line props has not changed,
}, (prevProps, nextProps) => {
    // compare if the text has changed or if the language plugin id has changed,
    return false //prevProps.lines === nextProps.lines && prevProps.plugin.id === nextProps.plugin.id
})

export default LineGenerator