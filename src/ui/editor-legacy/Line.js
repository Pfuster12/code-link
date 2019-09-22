// @flow

import React, { useState, useMemo, useLayoutEffect } from './react';
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
const Line = React.memo(props => {

     /**
     * The chopstring library memoized.
     */
    const chopstring = useMemo(() => Chopstring(), [])

    /**
     * The string to generate highlighted tokens.
     */
    const value = props.value

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    /**
     * This Line's natural index in the text.
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
            const tokenArray = chopstring.applyTokenPatterns(value, plugin)

            // if token array is not empty,
            if (tokenArray.length > 0) {
                console.info(`%c Line ${index} parsed. Tokens are: `, 'color: royalblue;', tokenArray)

                // save the tokens to state,
                return tokenArray
            }
        }
        // always return an empty array if the plugin features are not applied,
        return []
    },
    // run only when the string line or the plugin changes...
    [value, plugin])

    /**
     * Apply the tokens to the line value and create the <span/> tags to render into the Line.
     * Memoizes the result unless the tokens change.
     */
    const renderTokens = useMemo(() => {
        const spans = 
        // if the length is valid,
        (tokens.length > 0
        ?
        // map the token spans,
        tokens.map((token, index) => {
            return <span key={token.endIndex}
                    // class name is prefixed by the default token theme class,
                    // add the token class created by the prototype function in Token,
                    className={'token '+ token.createClass()}>
                        {
                            value.substring(token.startIndex, token.endIndex)
                        }
                    </span>
        })
        :
        // If no tokens are found display the original line with a basic token class.
        <span className="token">{value}</span>)
        
        return spans
    },
    [tokens])

    return (
        <div className="token-generator">
            {
                renderTokens
            }
        </div>
    )
}, (prevProps, nextProps) => {
    return prevProps.value == nextProps.value
})

Line.defaultProps = {
    value: '',
    index: 0,
    plugin: {}
}

export default Line