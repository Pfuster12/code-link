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
            <h6 className="text folders-title theme">Folders</h6>
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

