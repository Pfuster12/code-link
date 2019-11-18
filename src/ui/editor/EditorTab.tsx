import * as React from 'react'
import { FileIcon } from '../sidebar/plugins/folders/FileIcon'
import CloseIcon from '../components/CloseIcon'

interface EditorTabProps {
    tab: string
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorTab(props: EditorTabProps) {
    return (
        <div className="editor-tab">
            <FileIcon filename={props.tab}/>
            <span className="editor-tab-name">{props.tab}</span>
            <CloseIcon fill="#000"/>
        </div>
    )
}