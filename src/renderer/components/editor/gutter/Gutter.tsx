import * as React from 'react';
import VirtualizedList from '../../reusables/VirtualizedList';

interface GutterProps {
    lines: Map<number, string>,
    onScroll: (event: React.SyntheticEvent) => void,
    scrollTop: number
}

/**
 * Represents a File item.
 */
export default function Gutter(props: GutterProps) {
 
    return (
        <div className="gutter theme">
            <VirtualizedList
                id="gutter-1"
                width={-1}
                innerWidth={60}
                height={-1}
                rowHeight={19}
                count={props.lines.size}
                overflowCount={8}
                scrollTop={props.scrollTop}
                onScroll={props.onScroll}
                renderItem={(index, style) => {
                    return props.lines.size > 0 && 
                    <span key={index}
                    style={style}
                    className="token gutter-line line-height theme">
                        {index}
                    </span>
                }}/>
        </div>
    )
}

