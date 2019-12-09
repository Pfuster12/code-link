import * as React from 'react'
import { useState, useEffect } from 'react'
import EditorTab from './EditorTab'

interface EditorTabLayoutProps {
    tabs: string[],
    onTabSelected: (tab: string) => void
    onTabClose: (file: string) => void
}

/**
 * Displays a Tab Layout handling Editor open file tabs.
 */
export default function EditorTabLayout(props: EditorTabLayoutProps) {

    /**
     * Store the selected tab index.
     */
    const [currentTab, setCurrentTab] = useState(props.tabs[0])

    useEffect(() => {
        props.onTabSelected(currentTab)
    },
    [currentTab])

    /**
     * Handle a tab onClick.
     * @param event
     */
    function onTabClick(tab: string) {
        console.log(tab);
        
        setCurrentTab(tab)
    }

    return (
        <nav className="editor-tablayout">
            {
                props.tabs.map(tab => <EditorTab onClick={onTabClick}
                    onCloseClick={props.onTabClose} 
                    key={tab}
                    selected={currentTab}
                    tab={tab}/>)
            }
        </nav>
    )
}