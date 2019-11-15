import * as React from 'react'
import * as folder_closed from '../../assets/folder_closed.svg'
/**
 * Displays a folder item in the Folders SideBar plugin.
 */
export function Folder() {

    return (
        <div className="folder">
            <img src={folder_closed}/>
           <span className="folder-name">Test folder</span>
        </div>
    )
}