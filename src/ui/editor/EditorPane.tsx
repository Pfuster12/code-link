import * as React from 'react'
import Editor from './Editor'
import EditorTabLayout from './EditorTabLayout'

interface EditorPaneProps {
    
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorPane(props: EditorPaneProps) {
    // temp file path...
    const file = './src/test/files/coffee.txt'
    const tabs = ['me.tsx', 'you.js', 'him.html']

    return (
        <div className="editor-pane">
            <EditorTabLayout tabs={tabs}/>
            <Editor file={file}/>
        </div>
    )
}