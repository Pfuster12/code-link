import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import * as folder_closed from '../../../assets/file_icons/directory_icon.svg'
import * as chevron from '../../../assets/icons/chevron.svg'
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

    const lastPath = useMemo(() => {
        const paths = props.dir.name.split(/\/|\\/)
        return paths[paths.length - 1] ? paths[paths.length - 1] : props.dir.name
    },
    [])

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
        <div className={"folder-theme" + (props.isRoot ? "folder-root" : "folder")}>
            <div className="folder-item folder-item-theme"
                onClick={onFolderClick}>
                    <svg style={{transform: expanded && 'rotate(90deg)'}} width="18"
                     height="18" 
                     viewBox="0 0 24 24"
                     className="folder-chevron folder-chevron-theme">
                        <path
                        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                <img className="folder-icon" src={folder_closed}/>
                <span className="folder-name folder-name-theme">{lastPath}</span>
            </div>
            <ExpandableList expanded={expanded}>
                <ul className="folder-subdir">
                    {
                        dir 
                        && 
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