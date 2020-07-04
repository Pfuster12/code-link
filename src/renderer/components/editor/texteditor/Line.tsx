import * as React from 'react';
import { Lexer } from '../../../../lexer/Lexer';
import { useMemo } from 'react';
const jsPlugin = require("../../../../../public/grammars/javascript.json")

interface LineProps {
    line: string,
    style: Object
}

/**
 * Represents a Line in a text editor.
 */
export default function Line(props: LineProps) {

    const lexer = React.useMemo(() => new Lexer(), [])

     // Memoize the tokenisation operation on this Line.
     const tokens = useMemo(() => {
        return lexer.tokenise(props.line, jsPlugin)
    },
    // dep on the value or plugin,
    [props.line])

    return (
        <span className="line line-height theme"
            style={props.style}>
            {
                tokens.length > 0 
                ?
                tokens.map((token, index) => 
                    <span key={index} className={'token ' + token.name + ' theme'}>
                        {token.value}
                    </span>)
                :
                <span className="token">&nbsp;</span>
            }
        </span>
    )
}

