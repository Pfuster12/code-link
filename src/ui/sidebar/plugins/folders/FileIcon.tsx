import * as React from 'react'
import { useMemo } from 'react'
import FileExtensions from '../../../utils/FileExtensions'
import * as js from '../../../assets/ext_icons/js_icon.svg'
import * as git from '../../../assets/ext_icons/git_icon.svg'

interface FileIconProps {
    filename: string
}

/**
 * Displays a file icon depending on the file name extension.
 * Defaults to a .txt icon.
 */
export function FileIcon(props: FileIconProps) {

    /**
     * Determine the file icon to display from the extension.
     */
    const icon = useMemo(() => {        
        const regex = new RegExp('\\..+$')
        const matches = regex.exec(props.filename)
        const extension = matches ? matches[0] : ''
        
        switch (extension) {
            case FileExtensions.JAVASCRIPT_EXTENSION:
                return js
            case FileExtensions.GITIGNORE_EXTENSION:
                return git
        }
    },
    [props.filename])

    return (
        <img className="folders-icon" src={icon}/>
    )
}