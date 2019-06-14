// @flow

import React, { useState, useContext, useLayoutEffect } from 'react';
import Chopstring from '../../lexer/chopstring';
import Token from "../../objects/text-editor/Token";

/**
 * Generates a highlighted syntax line from the given line string value in the props
 * using a given language plugin.
 * @see TextEditor
 */
export default function Line(props) {

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
     * LayoutEffect run to tokenise the line on before paint.
     * 
     * Use this instead of useEffect() because we want the tokeniser to set state before
     * painting to screen to avoid flickering.
     */
    useLayoutEffect(() => {
        // tokeniser library.
        const chopstring = Chopstring()

        if (plugin.features) {
            // get the language plugin tokens from the line,
            const tokenArray = chopstring.applyTokenPatterns(string, plugin)

            if (tokenArray.length > 0) {
                // check if the token of this line matches with a multi token,
                const lastToken = tokenArray[tokenArray.length - 1]

                const tokenClasses = lastToken.id.split(" ")
                const lastClass = tokenClasses[tokenClasses.length - 1]
                const featureClass = lastClass.replace("-", "_")

                const feature = plugin.features[featureClass]
                const isMulti = feature.multi !== undefined
                console.log(isMulti);
                
                // set the tokens to state,
                setTokens(tokenArray)
            }
        }
    },
    // run only when the string line changes...
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