import * as React from 'react'
import { useState } from 'react'
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

    /**
     * Store the files this editor pane handles.
     */
    const [files, setFiles] = useState<string[]>([file])

    return (
        <div className="editor-pane">
            <EditorTabLayout tabs={files}/>
            <Editor file={file}/>
        </div>
    )
}