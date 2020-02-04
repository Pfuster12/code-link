import * as React from 'react'
import { useMemo } from 'react'
import {FileNameRegex} from '../../../utils/FileNameRegex'
import * as js from '../../../assets/file_icons/js_icon.svg'
import * as git from '../../../assets/file_icons/git_icon.svg'
import * as json from '../../../assets/file_icons/json_icon.svg'
import * as file from '../../../assets/file_icons/file_icon.svg'
import * as webpack from '../../../assets/file_icons/webpack_icon.svg'
import * as ts from '../../../assets/file_icons/ts_icon.svg'
import * as svg from '../../../assets/file_icons/svg_icon.svg'
import * as html from '../../../assets/file_icons/html_icon.svg'
import * as css from '../../../assets/file_icons/css_icon.svg'
import * as react from '../../../assets/file_icons/react_icon.svg'
import * as markdown from '../../../assets/file_icons/markdown_icon.svg'
import * as readme from '../../../assets/file_icons/readme_icon.svg'

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

        if (FileNameRegex.JAVASCRIPT.test(props.filename)) {            
            return js
        }
        else if (FileNameRegex.TYPESCRIPT_CONFIG.test(props.filename)) {
            return ts
        }
        else if (FileNameRegex.JSON.test(props.filename)) {
            return json
        }
        else if (FileNameRegex.GITIGNORE.test(props.filename)) {
            return git
        }
        else if (FileNameRegex.WEBPACK_CONFIG.test(props.filename)) {
            return webpack
        }
        else if(FileNameRegex.TYPESCRIPT.test(props.filename)) {
            return ts
        }
        else if (FileNameRegex.TYPESCRIPT_CUSTOM_TYPES.test(props.filename)) {
            return ts
        }
        else if (FileNameRegex.SVG.test(props.filename)) {
            return svg
        }
        else if (FileNameRegex.HTML.test(props.filename)) {
            return html
        }
        else if (FileNameRegex.CSS.test(props.filename)) {
            return css
        }
        else if (FileNameRegex.REACT.test(props.filename)) {
            return react
        }
        else if (FileNameRegex.README.test(props.filename)) {
            return readme
        }
        else if (FileNameRegex.MARKDOWN.test(props.filename)) {
            return markdown
        }
        else {
            return file
        }
    },
    [props.filename])

    return (
        <img src={icon} className="folder-icon" />
    )
}