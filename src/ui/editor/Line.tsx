import * as React from 'react'
import { useState, useMemo } from 'react'
import * as lexer from '../../lexer/Lexer'

interface LineProps {

    /**
     * The lexer library with which to parse this line.
     */
    lexer: lexer.Lexer

    /**
     * String value of this line.
     */
    value: string,

    /**
     * Plugin language grammar to tokenise this Line by.
     */
    plugin: lexer.Lexer.Plugin
}

/**
 * The code editor component handling line syntax highlighting and text editing.
 * @property props
 */
export default function Line(props: LineProps) {

    /**
     * Memoize the tokenisation operation on this Line.
     * @see Lexer
     */
    const tokens = useMemo(() => {
        // skip if plugin is null,
        if (props.plugin !== null) {
            return props.lexer.tokenise(props.value, props.plugin)
        } else {
            return []
        }
    },
    // dep on the value or plugin,
    [props.value, props.plugin])

    return (
        <div className="line">
            { 
                tokens.length > 0 
                ?
                tokens.map((token, index) => <span key={index} className={token.name}>{token.value}</span>)
                :
                <span className="token">&nbsp;</span>
            }
        </div>
    )
}