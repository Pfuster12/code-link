import * as React from 'react'
import { useMemo } from 'react'
import { EditorStatus } from './EditorPane'

interface StatusBarProps {
    status: EditorStatus
}
export default function StatusBar(props: StatusBarProps) {
    return (
        <div className="status-bar">
            <span>Ln {props.status.lineCount}</span>
            <span>Ln {props.status.extension}</span>
        </div>
    )
}