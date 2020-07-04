import * as React from 'react';
import Line from './Line';
import VirtualizedList from '../../reusables/VirtualizedList';
import { useMemo } from 'react';

interface TextEditorProps {
    lines: Map<number, string>,
    onScroll: (event: React.SyntheticEvent) => void,
    scrollTop: number
}

/**
 * Represents a File item.
 */
export default function TextEditor(props: TextEditorProps) {

    const lines = useMemo(() => {
        return Array.from(props.lines)
    }, 
    [props.lines])

    function onEditorScroll(event: React.SyntheticEvent) {
        props.onScroll(event)
    }

    return (
        <div className="text-editor theme">
            <VirtualizedList
                id="text-editor-1"
                width={-1}
                innerWidth="100%"
                height={-1}
                rowHeight={19}
                count={props.lines.size}
                overflowCount={8}
                scrollTop={props.scrollTop}
                onScroll={onEditorScroll}
                renderItem={(index, style) => {
                    return lines[index]
                    && 
                    <Line key={lines[index][0]} 
                        line={lines[index][1]}
                        style={style}/>
                }}>
                <div className="text-editor-overlay">
                    <div className="caret theme"/>
                </div>
            </VirtualizedList>
        </div>
    )
}

