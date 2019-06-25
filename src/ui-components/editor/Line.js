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
     * The multi token flag callback.
     */
    const onMultiTokenTriggered = props.onMultiTokenTriggered

    /**
     * The multi token passed from the previous line to match its 'end' property in this line.
     */
    const multiToken = props.multiToken

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
                if (Object.keys(multiToken).length > 0) {
                    console.log('This line has inherited a multi token! Token is: ', multiToken);
                    tokenArray.forEach(token => token.id += " " + multiToken.id)
                }

                // find the first ocurrence of a multi token in this line's tokens, if there is,
                const lastToken = tokenArray.find(token => token.id.includes("multi"))

                if (lastToken) {
                    const tokenClasses = lastToken.id.split(" ")
                    console.log(tokenClasses);
                    
                    const lastClass = tokenClasses[tokenClasses.length - 1]
                    const featureClass = lastClass.replace("-", "_")

                    console.log('The multi feature class is: ', featureClass);
                    
                    const feature = plugin.features[featureClass]

                    if (feature) {          
                        const isMulti = feature.multi !== undefined

                        // trigger the multi token flag callback,
                        if (isMulti) {
                            console.log('Multi token language feature is: ', feature.multi);
                            onMultiTokenTriggered(feature.multi)
                        }
                        console.log(isMulti)
                    }
                }
                
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