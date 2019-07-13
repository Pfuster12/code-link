// @flow

import React, { useState, useContext, useLayoutEffect } from 'react';
import Chopstring from '../../lexer/chopstring';
import Token from "../../objects/text-editor/Token";

/**
 * Generates a highlighted syntax line from the given line string value in the props
 * using a given language plugin. This component is memoized using the React.memo 
 * function to optimize performance.
 * @see TextEditor
 */
function Line(props) {

    /**
     * Holds the {@link Token} of this component.
     */
    const [tokens, setTokens] = useState([])

    /**
     * The string to generate highlighted tokens.
     */
    const string = props.line

    /**
     * The language plugin to tokenise by.
     */
    const plugin = props.plugin

    /**
     * Index of this Line component.
     */
    const index = props.index

    /**
     * An inherited multitoken from the {@link LineGenerator}.
     */
    const multitoken = props.multitoken

    /**
     * LayoutEffect run to tokenise the line on before paint.
     * 
     * Use this instead of useEffect() because we want the tokeniser to set state before
     * rendering to screen to avoid flickering.
     */
    useLayoutEffect(() => {
        // tokeniser library.
        const chopstring = Chopstring()

        // with a
        if (plugin.features) {
            // get the language plugin tokens from the line,
            const tokenArray = chopstring.applyTokenPatterns(string, plugin)

            // if token array is not empty,
            if (tokenArray.length > 0) {
                console.info(`%c Line ${index + 1} parsed. Tokens are: `, 'color: royalblue;', tokenArray)

                // save the tokens to state,
                setTokens(tokenArray)
            }
        }
    },
    // run only when the string line or the multitoken changes...
    [string])

    return (
        <div className="token-generator">
            {
                // map the spans,
                tokens.map((token, index) => {
                    return <span key={token.endIndex}
                            // class name is prefixed by the default token theme class,
                            className={'token '+ token.createClass()}>
                                {string.substring(token.startIndex, token.endIndex)}
                            </span>})
            }
        </div>
    )
}

Line.defaultProps = {
 
}

/**
 * The component is memoized.
 * @see https://reactjs.org/docs/react-api.html#reactmemo
 * React.memo is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.
 * If your function component renders the same result given the same props, you can wrap it in a call to React.memo for a performance
 * boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered
 * result.
 * By default it will only shallowly compare complex objects in the props object. If you want control over the comparison,
 * you can also provide a custom comparison function as the second argument.
 */
export default React.memo(Line)