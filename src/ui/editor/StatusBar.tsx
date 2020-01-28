import * as React from 'react'
import { useMemo } from 'react'
import { EditorStatus } from './EditorPane'

interface StatusBarProps {
    status: EditorStatus
}
export default function StatusBar(props: StatusBarProps) {

    // Memoize the extension string from the file prop.
    const extension = useMemo(() => {
        var temp = '.txt'
        if (props.status.file) {
            const routes = props.status.file.split('/')
            const name = routes[routes.length - 1]
    
            if (name) {
                const fileNames = name.split('.')
    
                if (fileNames.length > 1) {
                    temp = fileNames[fileNames.length - 1]
                }
            }
        
            return temp
        }
    },
    [props.status])

    return (
        <div className="status-bar status-bar-theme">
            <span className="status-bar-item">Line {props.status.selection.start.line + 1}</span>
            <span className="status-bar-item">Col {props.status.selection.start.offset + 1}</span>
            <span className="status-bar-item">{extension}</span>
            <span className="status-bar-version">v0.1.0</span>
        </div>
    )
}