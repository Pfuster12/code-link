import * as React from 'react'
import EditorTab from './EditorTab'

interface EditorTabLayoutProps {
    tabs: string[]
}

/**
 * Displays a Tab Layout handling Editor open file tabs.
 */
export default function EditorTabLayout(props: EditorTabLayoutProps) {

    return (
        <nav className="editor-tablayout">
            {
                props.tabs.map(tab => <EditorTab tab={tab}/>)
            }
        </nav>
    )
}