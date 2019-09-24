import * as React from 'react'
import { useMemo } from 'react'
import * as lexer from '../../lexer/Lexer'

interface LineProps {
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
 * The code editor component handling syntax highlighting and text editing.
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
            return lexer.tokenise(props.value, props.plugin)
        } else {
            return []
        }
    },
    // dep on the value or plugin,
    [props.value, props.plugin])

    return (
        <div className="line">
            { 
                tokens.map(token => <span>{token.value}</span>) 
            }
        </div>
    )
}