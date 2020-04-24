import * as React from 'react'
import { useMemo } from 'react'
import * as lexer from '../../lexer/Lexer'

interface LineProps {
    lexer: lexer.Lexer
    value: string,
    plugin: lexer.Lexer.Plugin,
    style: Object
}

/**
 * The code editor component handling line syntax highlighting and text editing.
 * This component is MEMOIZED for performance reducing re-renders.
 * @property props
 */
function Line(props: LineProps) {

    // Memoize the tokenisation operation on this Line.
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
        <div className="line"
            style={props.style}>
            { 
                tokens.length > 0 
                ?
                tokens.map((token, index) => <span key={index} className={'token ' + token.name}>{token.value}</span>)
                :
                <span className="token">&nbsp;</span>
            }
        </div>
    )
}

export default React.memo(Line)