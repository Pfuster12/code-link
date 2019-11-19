import * as React from 'react'
import { FileIcon } from '../sidebar/plugins/folders/FileIcon'
import CloseIcon from '../components/CloseIcon'

interface EditorTabProps {
    tab: string,
    selected: string,
    onClick: (tab: string) => void
    onCloseClick: (tab: string) => void
}

/**
 * Displays an Editor Tab of an open file.
 */
export default function EditorTab(props: EditorTabProps) {

    /**
     * Handles Tab click.
     * @param event 
     */
    function onCloseClick(event: React.SyntheticEvent) {
        props.onCloseClick(props.tab)
    }

    function onClick(event: React.SyntheticEvent) {
        props.onClick(props.tab)
    }

    return (
        <div className={props.tab === props.selected ? "editor-tab editor-tab-selected" : "editor-tab"}
            onClick={onClick}>
            <FileIcon filename={props.tab}/>
            <span className="editor-tab-name">{props.tab}</span>
            <CloseIcon onClick={onCloseClick} class="editor-tab-close"/>
        </div>
    )
}