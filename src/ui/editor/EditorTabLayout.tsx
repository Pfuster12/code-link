import * as React from 'react'
import { useState, useEffect } from 'react'
import EditorTab from './EditorTab'

interface EditorTabLayoutProps {
    tabs: string[],
    currentTab: number,
    onTabClick: (index: number) => void
    onTabClose: (index: number) => void
}

/**
 * Displays a Tab Layout handling Editor open file tabs.
 */
export default function EditorTabLayout(props: EditorTabLayoutProps) {

    /**
     * Handles Tab click.
     * @param event 
     */
    function onTabClick(index: number) {
        props.onTabClick(index)
    }

    /**
     * Handles Tab close.
     * @param event 
     */
    function onTabClose(index: number) {
        props.onTabClose(index)
    }

    return (
        <nav className="editor-tablayout editor-tablayout-theme">
            {
                props.tabs.map((tab, index) => {
                return <EditorTab key={tab}
                            tab={tab}
                            index={index} 
                            selected={props.currentTab}
                            onClick={onTabClick}
                            onClose={onTabClose}/>
                })
            }
        </nav>
    )
}