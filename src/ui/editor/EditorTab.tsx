import * as React from 'react'
import { FileIcon } from '../sidebar/plugins/folders/FileIcon'
import CloseIcon from '../components/CloseIcon'

interface EditorTabProps {
    tab: string,
    index: number,
    selected: number,
    onClick: (index: number) => void,
    onClose: (index: number) => void
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorTab(props: EditorTabProps) {

    /**
     * Handles Tab close icon click.
     * @param event 
     */
    function onClose(event: React.SyntheticEvent) {
        props.onClose(props.index) 
    }

    /**
     * Handles Tab click.
     * @param event 
     */
    function onClick(event: React.SyntheticEvent) {
        props.onClick(props.index)
    }

    return (
        <div className={props.selected == props.index ? "editor-tab editor-tab-selected" : "editor-tab"}>
            <div className="editor-tab-name-wrap"
                onClick={onClick}>
                <FileIcon filename={props.tab}/>
                <span className="editor-tab-name">{props.tab}</span>
            </div>
            <CloseIcon onClick={onClose} class="editor-tab-close"/>
        </div>
    )
}