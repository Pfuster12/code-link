import * as React from 'react'
import { Folder } from './Folder'

interface SideBarProps {
    children: React.ReactNode
}

/**
 * Displays the SideBar, a pane to house default plugins such as the {@link Folders} file explorer.
 */
export function SideBar(props: SideBarProps) {

    return (
        <section className="sidebar">
            {
                props.children
            }
        </section>
    )
}