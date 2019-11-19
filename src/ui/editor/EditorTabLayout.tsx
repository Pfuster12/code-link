import * as React from 'react'
import { useState } from 'react'
import EditorTab from './EditorTab'

interface EditorTabLayoutProps {
    tabs: string[]
}

/**
 * Displays a Tab Layout handling Editor open file tabs.
 */
export default function EditorTabLayout(props: EditorTabLayoutProps) {

    /**
     * Store the selected tab index.
     */
    const [currentTab, setCurrentTab] = useState(props.tabs[0])

    /**
     * Handle a tab onClick.
     * @param event
     */
    function onTabCloseClick(tab: string) {
    }

    /**
     * Handle a tab onClick.
     * @param event
     */
    function onTabClick(tab: string) {
        setCurrentTab(tab)
    }

    return (
        <nav className="editor-tablayout">
            {
                props.tabs.map(tab => <EditorTab onClick={onTabClick}
                    onCloseClick={onTabCloseClick} 
                    key={tab}
                    selected={currentTab}
                    tab={tab}/>)
            }
        </nav>
    )
}