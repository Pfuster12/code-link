import * as React from 'react'
import { useState, useEffect } from 'react'
import TextEditor from './TextEditor'
import EditorTabLayout from './EditorTabLayout'
import StatusBar from './StatusBar'
import { Selection } from './SelectionManager'

export namespace Editor {

    export interface Status {
        selection: Selection,
        file: string
    }

    export interface State {
        lines: string[][],
        selection: Selection
    }
}

function createEmptyEditorStatus(): Editor.Status {
    return {
        selection: {
            start: {
                line: 0,
                offset: 0
            },
            end: {
                line: 0,
                offset: 0
            }
        },
        file: ''
    }
}

interface EditorPaneProps {
    dirPath: string
    files: string[],
    onFileClose: (index: number) => void
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorPane(props: EditorPaneProps) {

    // Store the selected tab index.
    const [currentTab, setCurrentTab] = useState(0)

    // Editor Status.
    const [editorStatus, setEditorStatus] = useState<Editor.Status>(createEmptyEditorStatus())

    /**
     * Run effect on files changed to set the latest tab.
     */
    useEffect(() => {
        setCurrentTab(props.files.length - 1)

        // if files is empty reset status,
        if (props.files.length == 0) {
            setEditorStatus(createEmptyEditorStatus())
        }
    },
    [props.files])

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

    /**
     * Handle editor status change.
     * @param status 
     */
    function onStatusChange(status: Editor.Status) {
        setEditorStatus(status)
    }

    return (
        <div className="editor-pane">
            {
                props.files.length > 0
                ?
                <>
                    <EditorTabLayout tabs={props.files}
                        currentTab={currentTab}
                        onTabClick={onTabClick}
                        onTabClose={onTabClose}/>
                    <TextEditor file={props.files[currentTab]}
                        onStatusChange={onStatusChange}/>
                </>
                :
                <div className="empty-editor empty-editor-theme">
                    <span className=" empty-editor-text empty-editor-text-theme">Open a file in the Folders sidebar.</span>
                </div>
            }
            <StatusBar status={editorStatus}/>
        </div>
    )
}