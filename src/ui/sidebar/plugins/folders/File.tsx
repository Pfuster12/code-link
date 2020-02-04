import * as React from 'react'
import { Dirent } from 'fs'
import { FileIcon } from './FileIcon'

interface FileProps {
    file: Dirent,
    dirPath: string,
    onFileClick?: (filepath: string) => void
}

/**
 * Displays a file item in the Folders plugin.
 */
export function File(props: FileProps) {

    /**
     * Handle the file click.
     * @param event 
     */
    function handleFileClick(event: React.SyntheticEvent) {
        props.onFileClick(props.dirPath)
    }

    return (
        <div className="file"
            onClick={handleFileClick}>
            <FileIcon filename={props.file.name}/>
            <span className="folder-name folder-name-theme">{props.file.name}</span>
        </div>
    )
}