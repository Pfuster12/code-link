import * as React from 'react'
import { useState, useEffect } from 'react'
import Editor from './Editor'
import EditorTabLayout from './EditorTabLayout'
import StatusBar from './StatusBar'

interface EditorPaneProps {
    dirPath: string
    files: string[],
    onFileClose: (index: number) => void
}

export interface EditorStatus {
    lineCount: number,
    extension: string
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorPane(props: EditorPaneProps) {

    // Store the selected tab index.
    const [currentTab, setCurrentTab] = useState(0)

    const [editorStatus, setEditorStatus] = useState<EditorStatus>({
        lineCount: 0,
        extension: '.js'
    })

    /**
     * Handles Tab click.
     * @param event 
     */
    function onTabClick(index: number) {
        setCurrentTab(index)
    }

    /**
     * Handles Tab close.
     * @param event 
     */
    function onTabClose(index: number) {
        props.onFileClose(index)
        setCurrentTab(index)
    }

    function onStatusChange(status: EditorStatus) {
        setEditorStatus(status)
    }

    return (
        <div className="editor-pane">
            {
                props.files.length > 0
                &&
                <>
                    <EditorTabLayout tabs={props.files}
                        currentTab={currentTab}
                        onTabClick={onTabClick}
                        onTabClose={onTabClose}/>
                    <Editor file={props.files[currentTab]}
                        onStatusChange={onStatusChange}/>
                    <StatusBar status={editorStatus}/>
                </>
            }
        </div>
    )
}