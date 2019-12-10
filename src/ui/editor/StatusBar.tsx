import * as React from 'react'
import { useMemo } from 'react'

export default function StatusBar() {
    const lineCount = 0
    return (
        <div className="status-bar">
            <span>Ln {lineCount}</span>
        </div>
    )
}