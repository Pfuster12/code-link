import * as React from 'react'
import { useState } from 'react'
import Editor from './Editor'
import EditorTabLayout from './EditorTabLayout'

interface EditorPaneProps {
    dirPath: string
    files: string[],
    onFileClose: (file: string) => void
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorPane(props: EditorPaneProps) {

    /**
     * Store the selected tab index.
     */
    const [currentFile, setCurrentFile] = useState('')


    function onTabSelected(file: string) {
        setCurrentFile(file)
    }

    return (
        <div className="editor-pane">
            {
                props.files.length > 0
                &&
                <>
                    <EditorTabLayout tabs={props.files}
                        onTabClose={props.onFileClose}
                        onTabSelected={onTabSelected}/>
                    <Editor file={currentFile}/>
                </>
            }
        </div>
    )
}