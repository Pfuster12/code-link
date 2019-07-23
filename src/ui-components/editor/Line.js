// @flow

import React, { useState, useMemo, useLayoutEffect } from 'react';
import Chopstring from '../../lexer/chopstring';
import Token from "../../objects/text-editor/Token";

/**
 * Generates a highlighted syntax line from the given line string value in the props
 * using a given language plugin. This component is memoized using the React.memo 
 * function to optimize performance.
 * 
 * The component is memoized.
 * @see https://reactjs.org/docs/react-api.html#reactmemo
 * React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.
 * If your function component renders the same result given the same props, you can wrap it in a call to React.memo for a performance
 * boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered
 * result.
 * By default it will only shallowly compare complex objects in the props object. If you want control over the comparison,
 * you can also provide a custom comparison function as the second argument.
 *
 * @see TextEditor
 */
const Line = React.memo((props) => {

     /**
     * The chopstring library memoized.
     */
    const chopstring = useMemo(() => Chopstring(), [])

    /**
     * The string to generate highlighted tokens.
     */
    const line = props.line

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    /**
     * Index of this Line component.
     */
    const index = props.index

    /**
     * LayoutEffect run to tokenise the line on before paint.
     * 
     * Use this instead of useEffect() because we want the tokeniser to set state before
     * rendering to screen to avoid flickering.
     */
    const tokens = useMemo(() => {
        if (plugin.features) {
            // get the language plugin tokens from the line,
            const tokenArray = chopstring.applyTokenPatterns(line, plugin)

            // if token array is not empty,
            if (tokenArray.length > 0) {
                console.info(`%c Line ${index + 1} parsed. Tokens are: `, 'color: royalblue;', tokenArray)

                // save the tokens to state,
                return tokenArray
            }
        }
        // always return an empty array if the plugin features are not applied,
        return []
    },
    // run only when the string line or the plugin changes...
    [line, plugin])

    return (
        <div className="token-generator">
            {
                // map the spans,
                tokens.map((token, index) => {
                    return <span key={token.endIndex}
                            // class name is prefixed by the default token theme class,
                            // add the token class created by the prototype function in Token,
                            className={'token '+ token.createClass()}>
                                {
                                    line.substring(token.startIndex, token.endIndex)
                                }
                            </span>
                })
            }
        </div>
    )
    // pass a comparison function as a second argument to cancel
    // an update if the line props has not changed,
}, (prevProps, nextProps) => {
    // compare only the previous string to the new string text, if it's the same
    // then skip the update for this line,
    return prevProps.line == nextProps.line
})

export default Line