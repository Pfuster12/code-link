import * as React from 'react';
import Line from './Line';

interface TextEditorProps {
    lines: string[]
}

/**
 * Represents a File item.
 */
export default function TextEditor(props: TextEditorProps) {

    return (
        <div className="text-editor">
            {
                props.lines.map(line => 
                <Line key={Math.random()} 
                    line={line}/>)
            }
        </div>
    )
}

