import * as React from 'react';
import Tab from './Tab';

interface TabLayoutProps {
    files: string[],
    currentTab: string,
    onTabClick: (file: string) => void,
    onTabClose: (file: string) => void
}

/**
 * A TabLayout holding File Tabs.
 */
export default function TabLayout(props: TabLayoutProps) {

    return (
        <div className="tab-layout theme">
        {
            props.files.map((file, index) => 
                <Tab key={file + index}
                    file={file}
                    currentTab={props.currentTab}
                    onTabClick={props.onTabClick}
                    onTabClose={props.onTabClose}/>)
        }
        </div>
    )
}

