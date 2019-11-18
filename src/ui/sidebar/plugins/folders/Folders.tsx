import * as React from 'react'
import { useState, useEffect } from 'react'
import { Folder } from './Folder'
import FilesIO from '../../../../io/FilesIO'
import { Dirent } from 'fs'
import { File } from './File'
import { ResourceBoundUI } from '../../../components/ResourceBoundUI'

interface FoldersProps {
    dirPath: string
}

/**
 * Displays the SideBar Folders file explorer default plugin.
 * This plugin lists the directory opened and its contents in a file-tree structure.
 * @example
 * dirname
 *  - folder1
 *    - file1.txt
 *  -folder2
 */
export function Folders(props: FoldersProps) {

    /**
     * Store the dir content to display in this plugin.
     */
    const [dir, setDir] = useState<Dirent[]>(null)

    /**
     * Store the dir watcher's last fired event timestamp.
     */
    const [watchEventTimestamp, setWatchEventTimestamp] = useState<number>(-1)

    /**
     * Read the directories contents to display.
     */
    useEffect(() => {
        FilesIO().readDir(props.dirPath)
            .then(res => {
                console.log('Dir contents are: ', res);
                setDir(res)
            })
            .catch(err =>{
                console.log('Error reading directory in Folders plugin.', err);
                setDir(null)
            })
    },
    // dep on the dir path changing or the watcher event timestamp,
    [props.dirPath, watchEventTimestamp])

    /**
     * Watch the dir contents change events and reset the change timestamp.
     */
    useEffect(() => {
        FilesIO().watchDir(props.dirPath, (event, filename) => {
            const d = new Date()
            console.log('Event ' + event + ' fired in ' + props.dirPath);
            setWatchEventTimestamp(d.getMilliseconds())
        })
    },
    // dep on the dir path changing,
    [props.dirPath])

    return (
        <div className="folders">
            <h1 className="folders-title">Folders</h1>
            <ResourceBoundUI resource={dir}>
                <span className="folders-empty">Open a folder to view its contents here.</span>
                <Folder dir={dir} dirPath={props.dirPath}/>
            </ResourceBoundUI>
        </div>
    )
}