import * as React from 'react'
import { Dirent } from 'fs'
import { FileIcon } from './FileIcon'

interface FileProps {
    file: Dirent
}

/**
 * Displays a file item in the Folders plugin.
 */
export function File(props: FileProps) {

    return (
        <div className="file">
            <FileIcon extension={props.file.name}/>
            <span className="folders-name file-name">{props.file.name}</span>
        </div>
    )
}