import * as React from 'react';
import ToolBarItem, { ToolbarItems } from './ToolBarItem';

interface ToolBarProps {
    folder: string,
    currentItem: ToolbarItems,
    onItemClick: (id: ToolbarItems) => void
}
/**
 * Toolbar with main editor functionalities.
 */
export default function ToolBar(props: ToolBarProps) {
    
    const items = [
        ToolbarItems.FOLDERS,
        ToolbarItems.PLUGINS,
        ToolbarItems.SETTINGS
    ]
    return (
        <nav className="toolbar theme">
            {
                items.map(item => 
                    <ToolBarItem currentItem={props.currentItem} 
                        key={item} 
                        id={item} 
                        onClick={props.onItemClick}/>)
            }
        </nav>
    )
}

