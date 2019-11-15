import * as React from 'react'
import { Folder } from './Folder'

/**
 * Displays the SideBar default plugin of a folder file explorer.
 */
export function Folders() {

    const test = [0, 1, 2, 3, ,4]

    return (
        <div className="folders">
            <h1 className="folders-title">Folders</h1>
            {
                test.map(item => <Folder key={item}/>)
            }
        </div>
    )
}