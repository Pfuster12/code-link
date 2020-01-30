import * as React from 'react'
import { useMemo } from 'react'
import { EditorStatus } from './EditorPane'
import { extractFileExtension } from '../utils/FileNameRegex'

interface StatusBarProps {
    status: EditorStatus
}
export default function StatusBar(props: StatusBarProps) {

    // Memoize the extension string from the file prop.
    const extension = useMemo(() => {
        return extractFileExtension(props.status.file)
    },
    [props.status])

    return (
        <div className="status-bar status-bar-theme">
            <span className="status-bar-item">Line {props.status.selection.start.line + 1}</span>
            <span className="status-bar-item">Col {props.status.selection.start.offset + 1}</span>
            <span className="status-bar-item">{extension}</span>
            <span className="status-bar-item status-bar-version">v0.1.0</span>
        </div>
    )
}