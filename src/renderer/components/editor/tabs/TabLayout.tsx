import * as React from 'react';
import Tab from './Tab';

interface TabLayoutProps {
    files: string[]
}

/**
 * Represents a File item.
 */
export default function TabLayout(props: TabLayoutProps) {

    return (
        <div className="tab-layout theme">
            {
                props.files.map(file => <Tab key={file} file={file}/>)
            }
        </div>
    )
}

