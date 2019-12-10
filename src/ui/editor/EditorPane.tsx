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

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorPane(props: EditorPaneProps) {

    // Store the selected tab index.
    const [currentTab, setCurrentTab] = useState(0)

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
                    <Editor file={props.files[currentTab]}/>
                    <StatusBar/>
                </>
            }
        </div>
    )
}