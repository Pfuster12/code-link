// @flow

import React, { useState, useMemo } from 'react';
import Chopstring from '../../lexer/chopstring';
import Line from './Line';

/**
 * Displays an array of generated {@link Line} components from a given text.
 * @function
 */
export default function LineGenerator(props) {

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
     * Layout effect to generate the lines. Changes only if the text prop changes.
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
                 // changes, therefore we have to pass a unique key that won't change if
                 // the only the position of the line changes because it leads to performance
                 // issues when adding only new lines before the unchanged line,
                lines.map((line, index, array) => <Line key={line}
                                                line={line} 
                                                plugin={plugin}
                                                index={index}/>
                )
            }
        </span>
    )
}

/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str, seed) {
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
}