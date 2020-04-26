import * as React from 'react';
import Folder from './Folder';

interface FoldersProps {
    path: string
}

/**
 * Folders Plugin
 */
export default function Folders(props: FoldersProps) {

    return (
        <section className="plugin folders theme">
            <span className="text folders-title theme">Folders</span>
            {
                props.path
                &&
                <Folder path={props.path}/>
            }
        </section>
    )
}

