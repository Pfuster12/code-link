import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Dirent } from 'fs';
import FilesIO from '../../../../io/FilesIO';
import File from './File';

interface FolderProps {
    path: string,
    defaultOpen?: boolean,
    onFileOpen: (path: string) => void
}

/**
 * Represents a Folder item.
 */
export default function Folder(props: FolderProps) {

    // isOpen flag
    const [isOpen, setIsOpen] = useState(props.defaultOpen)

    // Dir contents.
    const [dir, setDir] = useState<Dirent[]>(null)

    // Display name
    const name = useMemo(() => FilesIO.getLastPath(props.path), [props.path])

    /**
     * Read directory contents on folder expanded.
     */
    useEffect(() => {
        if (isOpen) {
            console.log("[FOLDER] Reading dir contents...");
            
            FilesIO.readDir(props.path)
            .then(FilesIO.sortByDirectory)
            .then(res => {
                setDir(res)
            })
            .catch(err => {
                console.log('Error reading folder: ', props.path, err);
            })
        }
    },
    [isOpen])

    function onFolderClick(event: React.SyntheticEvent) {
        setIsOpen(!isOpen)
    }

    return (
        <div className="folder theme">
            <div className="folder-name-wrap theme"
                onClick={onFolderClick}>
                <svg style={{transform: isOpen && 'rotate(90deg)'}}
                    className="folder-icon theme" 
                    viewBox="0 0 24 24">
                    <path d="M8.59,16.58L13.17,12L8.59,
                    7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
                <span className="folder-name text theme">{name}</span>
            </div>
            {
                isOpen
                &&
                <ul className="folder-list">
                {
                    dir && dir.map(item => 
                        item.isDirectory() 
                        ?
                        <Folder key={item.name}
                            path={`${props.path}/${item.name}`}
                            onFileOpen={props.onFileOpen}/>
                        :
                        <File key={item.name} 
                            path={`${props.path}/${item.name}`}
                            onFileOpen={props.onFileOpen}/>
                    )
                }
                </ul>
            }
        </div>
    )
}

