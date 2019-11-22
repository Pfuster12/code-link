import * as React from 'react'
import { useState, useEffect } from 'react'
import * as folder_closed from '../../../assets/file_icons/folder_closed_icon.svg'
import * as folder_open from '../../../assets/file_icons/folder_open_icon.svg'
import { Dirent } from 'fs'
import ExpandableList from '../../../components/ExpandableList'
import FilesIO from '../../../../io/FilesIO'
import { File } from './File'

interface FolderProps {
    dirPath: string,
    dir: Dirent | { name: string },
    onFileClick?: (filepath: string) => void,
    defaultExpanded?: boolean,
    isRoot?: boolean
}

/**
 * Displays an expandable directory in the Folders SideBar plugin.
 */
export function Folder(props: FolderProps = { dirPath: '',
    dir: {name: ''},
    onFileClick: null, 
    defaultExpanded: false, 
    isRoot: false}) {

    /**
     * Toggle for the folder content to expand below.
     */
    const [expanded, setExpanded] = useState(props.defaultExpanded)

    /**
     * Store the dir content to display in this plugin.
     */
    const [dir, setDir] = useState<Dirent[]>(null)

    /**
     * Read directory contents on folder expanded.
     */
    useEffect(() => {
        if (expanded) {
            // read contents on click expansion
            FilesIO().readDir(props.dirPath)
            .then(res => {
                // sort out content by dirs first,
                res.sort((a, b) =>  {
                    if (a.isDirectory() && b.isDirectory()) {
                        return 0
                    } else if (a.isDirectory() && !b.isDirectory()) {
                        return -1
                    } else {
                        return 1
                    }
                })
                setDir(res)
            })
            .catch(err => {
                console.log('Error reading folder: ', props.dir.name, err);
            })
        }
    },
    [expanded])

    /**
     * Handle the folder onClick.
     * @param event 
     */
    function onFolderClick(event: React.SyntheticEvent) {
        setExpanded(!expanded)
    }

    return (
        <div className={props.isRoot ? "folder-root" : "folder"}>
            <div className="folders-item folders-item-theme"
                onClick={onFolderClick}>
                <img className="folders-icon" src={expanded ? folder_open : folder_closed}/>
                <span className="folders-name folder-name">{props.dir.name}</span>
            </div>
            <ExpandableList expanded={expanded}>
                <ul className="folder-subdir">
                    {
                        dir && 
                        dir.map(item => {
                            return item.isDirectory() 
                            ?
                            <Folder key={item.name} 
                                dirPath={props.dirPath + '/' + item.name}
                                dir={item}
                                onFileClick={props.onFileClick}/>
                            :
                            <File key={item.name} 
                                dirPath={props.dirPath + '/' + item.name}
                                file={item}
                                onFileClick={props.onFileClick}/>
                        })
                    }
                </ul>
            </ExpandableList>
        </div>
    )
}