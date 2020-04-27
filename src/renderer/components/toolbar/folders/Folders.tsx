import * as React from 'react';
import Folder from './Folder';

interface FoldersProps {
    path: string,
    onFileOpen: (path: string) => void
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
                <Folder defaultOpen={true} 
                    path={props.path}
                    onFileOpen={props.onFileOpen}/>
            }
        </section>
    )
}

