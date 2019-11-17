import * as React from 'react'
import { useState, useEffect } from 'react'
import * as folder_closed from '../../../assets/file_icons/folder_closed.svg'
import { Dirent } from 'fs'
import ExpandableList from '../../../components/ExpandableList'
import FilesIO from '../../../../io/FilesIO'
import { File } from './File'

interface FolderProps {
    dirPath: string,
    dir: Dirent
}

/**
 * Displays a folder item in the Folders SideBar plugin.
 */
export function Folder(props: FolderProps) {

    /**
     * Toggle for the folder content to expand below.
     */
    const [expanded, setExpanded] = useState(false)

    /**
     * Store the dir content to display in this plugin.
     */
    const [dir, setDir] = useState<Dirent[]>(null)

    /**
     * Handle the folder onClick.
     * @param event 
     */
    function onFolderClick(event: React.SyntheticEvent) {
        if (expanded) {
            setExpanded(!expanded)
        } else {
            // read contents on click expansion
            FilesIO().readDir(props.dirPath)
            .then(res => {
                setDir(res)
                setExpanded(!expanded)
            })
            .catch(err => {
                console.log('Error reading folder: ', props.dir.name, err);
            })
        }
    }

    return (
        <div className="folder">
            <div className="folders-text folders-text-theme"
                onClick={onFolderClick}>
                <img className="folders-icon" src={folder_closed}/>
                <span className="folders-name folder-name">{props.dir.name}</span>
            </div>
            <ExpandableList expanded={expanded}>
                <ul className="folder-subdir">
                    {
                        dir && 
                        dir.map(item => {
                            return item.isDirectory() 
                            ?
                            <Folder key={item.name} dirPath={props.dirPath + '/' + item.name} dir={item}/>
                            :
                            <File key={item.name} file={item}/>
                        })
                    }
                </ul>
            </ExpandableList>
        </div>
    )
}