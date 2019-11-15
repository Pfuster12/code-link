import * as React from 'react'
import { useState } from 'react'

interface ExpandableListProps {
    expanded: boolean,
    children: React.ReactNode
}

export default function ExpandableList(props: ExpandableListProps) {
    
    return (
        <div className="expandable-list">
            {
                props.expanded && props.children
            }
        </div>
    )
}