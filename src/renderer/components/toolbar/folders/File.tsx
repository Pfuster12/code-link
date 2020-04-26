import * as React from 'react';
import FilesIO from '../../../../io/FilesIO';
import { useMemo } from 'react';

interface FileProps {
    path: string
}

/**
 * Represents a File item.
 */
export default function File(props: FileProps) {

    // Display name.
    const name = useMemo(() => FilesIO.getLastPath(props.path), [props.path])
        
    return (
        <div className="file theme">
            <svg className="file-icon theme" 
                viewBox="0 0 24 24">
                <path
                d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
            </svg>
            <span className="file-name text theme">{name}</span>
        </div>
    )
}

