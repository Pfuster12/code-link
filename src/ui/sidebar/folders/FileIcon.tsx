import * as React from 'react'

interface FileIconProps {
    extension: string
}

/**
 * Displays a file icon depending on the file name extension.
 * Defaults to a .txt icon.
 */
export function FileIcon(props: FileIconProps) {

    return (
        <img className="folders-icon"/>
    )
}