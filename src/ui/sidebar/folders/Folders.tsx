import * as React from 'react'
import { Folder } from './Folder'

/**
 * Displays the SideBar default plugin of a folder file explorer.
 */
export function Folders() {

    const test = [0, 1, 2, 3, ,4]

    return (
        <section className="folders">
            {
                test.map(item => <Folder/>)
            }
        </section>
    )
}