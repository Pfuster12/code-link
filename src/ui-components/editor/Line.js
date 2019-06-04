// @flow

import React, { useState, useContext, useLayoutEffect } from 'react';
import Chopstring from '../../lexer/chopstring';

/**
 * Generates a highlighted syntax line from the given line string value in the props
 * using a given language plugin.
 * @see TextEditor
 */
export default function Line(props) {

    /**
     * State for this line component. 
     * 
     * It holds the tokens of this line text (className and index) and the
     * string spans of the text separated by the tokens to be classed and rendered.
     */
    const [line, setLine] = useState({
        tokens: [],
        spans: []
    })

    /**
     * The string to generate highlighted tokens.
     */
    const string = props.line

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    /**
     * LayoutEffect run to tokenise the line on before paint.
     * 
     * Use this instead of useEffect() because we want the tokeniser to set state before
     * painting to screen to avoid flickering.
     */
    useLayoutEffect(() => {
        /**
         * Instance of the tokeniser library.
         */
        const chopstring = Chopstring()

        // get the language plugin tokens from the line,
        const tokens = plugin.features !== undefined ? chopstring.applyTokenPatterns(string, plugin) : []

        // split the line by spans according to the language plugin tokens,
        setLine({
            tokens: tokens,
            spans: tokens.map(token => {
                return string.substring(token.startIndex, token.lastIndex)
            })
        })
    },
    [string])

    return (
        <div className="token-generator">
            {
                // map the spans
                line.spans.map((span, index) => <span key={line.tokens[index].lastIndex}
                                                     className={'token '+ line.tokens[index].id.replace(".", " ").trim()}>{span}</span>)
            }
        </div>
    )
}