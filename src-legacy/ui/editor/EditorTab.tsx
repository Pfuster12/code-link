import * as React from 'react'
import { FileIcon } from '../sidebar/plugins/folders/FileIcon'
import CloseIcon from '../components/CloseIcon'
import { useMemo } from 'react'

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

    const endpointName = useMemo(() => {
        const routes = props.tab.split('/')
        return routes[routes.length - 1]
    },
    [props.tab])

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
        <div className={props.selected == props.index ? "editor-tab editor-tab-selected editor-tab-selected-theme" : "editor-tab editor-tab-theme"}>
            <div className="editor-tab-name-wrap"
                onClick={onClick}>
                <FileIcon filename={endpointName}/>
                <span className="editor-tab-name editor-tab-name-theme">{endpointName}</span>
            </div>
            <CloseIcon onClick={onClose} class="editor-tab-close"/>
        </div>
    )
}