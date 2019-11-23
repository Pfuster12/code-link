import * as React from 'react'
import { useState } from 'react'
import Editor from './Editor'
import EditorTabLayout from './EditorTabLayout'

interface EditorPaneProps {
    dirPath: string
    files: string[]
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorPane(props: EditorPaneProps) {
    return (
        <div className="editor-pane">
            <EditorTabLayout tabs={props.files}/>
            <Editor file={props.files[0]}/>
        </div>
    )
}